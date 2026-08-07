import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { publicKeys } from './usePublicData';

const socketUrl = (() => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  return apiUrl.replace(/\/api\/v\d+\/?$/, '');
})();

let socket;

export const getAnnouncementsSocket = () => {
  if (socket?.connected) return socket;
  socket = io(`${socketUrl}/public`, {
    transports: ['websocket', 'polling'],
    reconnection: true,
  });
  return socket;
};

export function useAnnouncementsRealtime(enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return undefined;
    const client = getAnnouncementsSocket();
    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: publicKeys.announcements() });
    };
    client.on('announcement:changed', invalidate);
    return () => {
      client.off('announcement:changed', invalidate);
    };
  }, [enabled, queryClient]);
}
