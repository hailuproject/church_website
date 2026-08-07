import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.resolve(__dirname, '../logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const logFile = path.join(logsDir, 'app.log');
const errorFile = path.join(logsDir, 'error.log');

const writeFile = (file, line) => {
  try {
    fs.appendFileSync(file, line + '\n');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Logger write failed:', err.message);
  }
};

const format = (level, message, meta) => {
  const parts = [`[${new Date().toISOString()}]`, `[${level}]`, message];
  if (meta !== undefined) parts.push(typeof meta === 'string' ? meta : JSON.stringify(meta));
  return parts.join(' ');
};

const log = (level, message, meta) => {
  const line = format(level, message, meta);
  const toConsole = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  toConsole(line);
  if (config.isProd || level === 'error' || level === 'warn') {
    writeFile(level === 'error' ? errorFile : logFile, line);
  }
};

export const logger = {
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),
  debug: (message, meta) => {
    if (!config.isProd) log('debug', message, meta);
  },
};

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const line = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
    if (res.statusCode >= 400) logger.warn(line);
    else logger.info(line);
  });
  next();
};

export default logger;
