import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { publicKeys } from './usePublicData';

const socketUrl = (() => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  return apiUrl.replace(/\/api\/v\d+\/?$/, '');
})();

let socket;
let socketUsers = 0;

export const getAnnouncementsSocket = () => {
  if (socket?.connected) return socket;
  socket = io(`${socketUrl}/public`, {
    transports: ['websocket', 'polling'],
    reconnection: true,
  });
  return socket;
};

const releaseAnnouncementsSocket = () => {
  socketUsers = Math.max(0, socketUsers - 1);
  if (socketUsers === 0 && socket) {
    socket.disconnect();
    socket = null;
  }
};

export function useAnnouncementsRealtime(enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;
    socketUsers += 1;
    const client = getAnnouncementsSocket();
    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: publicKeys.announcements() });
    };
    client.on('announcement:changed', invalidate);
    return () => {
      client.off('announcement:changed', invalidate);
      releaseAnnouncementsSocket();
    };
  }, [enabled, queryClient]);
}
