import { useCallback, useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import type { Task } from '../types/task.interface';

interface UseSocketEventsProps {
  projectId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const useSocketEvents = ({ projectId, setTasks }: UseSocketEventsProps) => {
  const {
    onTaskMove,
    offTaskMove,
    onTaskCreate,
    offTaskCreate,
    onTaskUpdate,
    offTaskUpdate,
    onTaskDelete,
    offTaskDelete
  } = useSocket(projectId);

  const handleSocketTaskMove = useCallback((updatedTask: any) => {
    console.log('Socket task move received:', updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? {
            ...task,
            columnId: updatedTask.columnId,
            description: updatedTask.title || task.description
          }
          : task
      )
    );
  }, [setTasks]);

  const handleSocketTaskCreate = useCallback((newTask: Task) => {
    console.log('Socket task create received:', newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [setTasks]);

  const handleSocketTaskUpdate = useCallback((updatedTask: any) => {
    console.log('Socket task update received:', updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? {
            ...task,
            description: updatedTask.title || task.description,
            columnId: updatedTask.columnId || task.columnId
          }
          : task
      )
    );
  }, [setTasks]);

  const handleSocketTaskDelete = useCallback((taskId: string) => {
    console.log('Socket task delete received:', taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, [setTasks]);

  useEffect(() => {
    onTaskMove(handleSocketTaskMove);
    onTaskCreate(handleSocketTaskCreate);
    onTaskUpdate(handleSocketTaskUpdate);
    onTaskDelete(handleSocketTaskDelete);

    return () => {
      offTaskMove(handleSocketTaskMove);
      offTaskCreate(handleSocketTaskCreate);
      offTaskUpdate(handleSocketTaskUpdate);
      offTaskDelete(handleSocketTaskDelete);
    };
  }, [
    onTaskMove,
    offTaskMove,
    onTaskCreate,
    offTaskCreate,
    onTaskUpdate,
    offTaskUpdate,
    onTaskDelete,
    offTaskDelete,
    handleSocketTaskMove,
    handleSocketTaskCreate,
    handleSocketTaskUpdate,
    handleSocketTaskDelete
  ]);
};
