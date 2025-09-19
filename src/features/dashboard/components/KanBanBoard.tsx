import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useSocketEvents } from "../hooks/useSocketEvents";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/task.interface";
import { CustomDragOverlay } from "./DragOverlay";
import { KanbanColumn } from "./KanbanColumn";

type Column = {
  id: string;
  name: string;
  order: number;
};

interface KanbanBoardProps {
  project: { columns: Column[]; id: string };
}

export default function KanbanBoard({ project }: KanbanBoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requiere 8px de movimiento antes de activar el drag
      },
    })
  );

  const { data: tasksData, updateTaskColumn } = useTasks({ projectId: project.id });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Custom hooks
  const { handleDragEnd } = useDragAndDrop({
    tasks,
    setTasks,
    updateTaskColumn,
    project
  });

  useSocketEvents({ projectId: project.id, setTasks });

  // Inicializar tareas
  useEffect(() => {
    if (tasksData) {
      setTasks(
        tasksData.map((t: Task) => ({
          ...t,
          id: t.id,
          description: t.description,
          columnId: t.columnId,
        }))
      );
    }
  }, [tasksData]);

  const handleDragStart = (event: any) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEndWithCleanup = (event: any) => {
    handleDragEnd(event);
    setActiveTask(null);
  };

  return (
    <div className="flex-1 h-full w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndWithCleanup}
      >
        {/* Board Container - Contenedor con scroll horizontal */}
        <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-500">
          <div className="flex gap-6 p-4 h-full" style={{ minWidth: 'fit-content' }}>
            {project.columns
              .sort((a, b) => a.order - b.order)
              .map((col) => (
                <div key={col.id} className="flex-shrink-0" style={{ minWidth: '280px', width: '320px' }}>
                  <KanbanColumn
                    column={col}
                    tasks={tasks.filter((t) => t.columnId === col.id)}
                  />
                </div>
              ))}
          </div>
        </div>


        {/* Custom Drag Overlay */}
        <CustomDragOverlay activeTask={activeTask} />
      </DndContext>
    </div>
  );
}