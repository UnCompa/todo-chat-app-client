import { useEffect, useRef } from 'react';
import { socketManager } from '../lib/socket';

export const useSocket = (projectId?: string) => {
  const socketRef = useRef(socketManager.getSocket());

  useEffect(() => {
    if (projectId) {
      socketManager.joinProject(projectId);
    }

    return () => {
      // No desconectar automáticamente, solo limpiar listeners específicos
    };
  }, [projectId]);

  return {
    socket: socketRef.current,
    joinProject: socketManager.joinProject.bind(socketManager),
    leaveProject: socketManager.leaveProject.bind(socketManager),
    onTaskMove: socketManager.onTaskMove.bind(socketManager),
    onTaskCreate: socketManager.onTaskCreate.bind(socketManager),
    onTaskUpdate: socketManager.onTaskUpdate.bind(socketManager),
    onTaskDelete: socketManager.onTaskDelete.bind(socketManager),
    offTaskMove: socketManager.offTaskMove.bind(socketManager),
    offTaskCreate: socketManager.offTaskCreate.bind(socketManager),
    offTaskUpdate: socketManager.offTaskUpdate.bind(socketManager),
    offTaskDelete: socketManager.offTaskDelete.bind(socketManager),
  };
};
