// src/lib/socket.ts
import { io, Socket } from 'socket.io-client';
import { Env } from '../config/env';

class SocketManager {
  private socket: Socket | null = null;
  private currentProject: string | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;
    console.info("CONNETING WITH SOCKET")
    this.socket = io(Env.ApiUrl || 'http://localhost:3001', {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Connected to server:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentProject = null;
    }
  }

  joinProject(projectId: string) {
    if (!this.socket) this.connect();

    // Salir del proyecto anterior si existe
    if (this.currentProject && this.currentProject !== projectId) {
      this.socket?.emit('leave_project', this.currentProject);
    }

    // Unirse al nuevo proyecto
    this.socket?.emit('join_project', projectId);
    this.currentProject = projectId;
    console.log(`Joined project: ${projectId}`);
  }

  leaveProject() {
    if (this.currentProject && this.socket) {
      this.socket.emit('leave_project', this.currentProject);
      this.currentProject = null;
    }
  }

  // Método para obtener la instancia del socket
  getSocket() {
    if (!this.socket) this.connect();
    return this.socket;
  }

  // Métodos de conveniencia para eventos específicos
  onTaskMove(callback: (task: any) => void) {
    this.getSocket()?.on('task:move', callback);
  }

  onTaskCreate(callback: (task: any) => void) {
    this.getSocket()?.on('task:create', callback);
  }

  onTaskUpdate(callback: (task: any) => void) {
    this.getSocket()?.on('task:update', callback);
  }

  onTaskDelete(callback: (taskId: string) => void) {
    this.getSocket()?.on('task:delete', callback);
  }

  // Método para remover listeners
  offTaskMove(callback?: (task: any) => void) {
    this.getSocket()?.off('task:move', callback);
  }

  offTaskCreate(callback?: (task: any) => void) {
    this.getSocket()?.off('task:create', callback);
  }

  offTaskUpdate(callback?: (task: any) => void) {
    this.getSocket()?.off('task:update', callback);
  }

  offTaskDelete(callback?: (taskId: string) => void) {
    this.getSocket()?.off('task:delete', callback);
  }
}

// Singleton instance
export const socketManager = new SocketManager();
