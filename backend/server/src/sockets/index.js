import { Server } from 'socket.io';
import config from '../config/index.js';
import { verifyAccessToken } from '../utils/jwt.js';
import Admin from '../models/Admin.js';
import { logger } from '../utils/logger.js';

let io = null;

export const getIO = () => io;

export const emitToAdmins = (event, payload, roles = null) => {
  if (!io) return;
  const rooms = roles && roles.length ? roles : ['admins'];
  const roomList = Array.isArray(rooms) ? rooms : [rooms];
  roomList.forEach((room) => io.to(room).emit(event, payload));
};

export const emitToPublic = (event, payload, room = 'announcements') => {
  if (!io) return;
  io.of('/public').to(room).emit(event, payload);
};

export const initSockets = (server) => {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: config.clientUrl
        ? config.clientUrl.split(',').map((url) => url.trim())
        : '*',
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));
      const decoded = verifyAccessToken(token);
      const admin = await Admin.findById(decoded.id);
      if (!admin || !admin.isActive) return next(new Error('Invalid account'));
      socket.admin = admin;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  const publicNamespace = io.of('/public');

  publicNamespace.on('connection', (socket) => {
    socket.join('announcements');
    logger.info(`Public socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
      logger.info(`Public socket disconnected: ${socket.id}`);
    });
  });

  io.on('connection', (socket) => {
    const role = socket.admin?.role;
    if (role) socket.join(role);
    socket.join('admins');
    logger.info(`Socket connected: ${socket.id} (${role || 'unknown'})`);

    socket.on('subscribe', (module) => {
      socket.join(`module:${module}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  logger.info('Socket.io initialized');
  return io;
};

export default { initSockets, getIO, emitToAdmins, emitToPublic };
