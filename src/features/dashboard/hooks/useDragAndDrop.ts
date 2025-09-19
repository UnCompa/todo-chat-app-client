import { useCallback } from 'react';
import type { Task } from '../types/task.interface';

type Column = {
  id: string;
  name: string;
  order: number;
};

interface UseDragAndDropProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTaskColumn: (params: { taskId: string; columnId: string; projectId: string }) => Promise<void>;
  project: { columns: Column[]; id: string };
}

export const useDragAndDrop = ({
  tasks,
  setTasks,
  updateTaskColumn,
  project
}: UseDragAndDropProps) => {

  const handleDragEnd = useCallback(async (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    let newColumnId: string | undefined;

    // Determinar la columna destino
    const isColumn = project.columns.some(col => col.id === over.id);
    if (isColumn) {
      newColumnId = over.id;
    } else {
      const overTask = tasks.find(t => t.id === over.id);
      if (overTask) {
        newColumnId = overTask.columnId;
      }
    }

    // Solo actualizar si cambiamos de columna
    if (newColumnId && activeTask.columnId !== newColumnId) {
      // Actualización optimista
      setTasks((prev) =>
        prev.map((t) =>
          t.id === active.id ? { ...t, columnId: newColumnId } : t
        )
      );

      try {
        await updateTaskColumn({
          taskId: activeTask.id,
          columnId: newColumnId,
          projectId: project.id
        });
      } catch (error) {
        console.error("Error updating task column:", error);
        // Revertir cambio
        setTasks((prev) =>
          prev.map((t) =>
            t.id === active.id ? { ...t, columnId: activeTask.columnId } : t
          )
        );
      }
    }
  }, [tasks, setTasks, updateTaskColumn, project]);

  return { handleDragEnd };
};
