import {
  DndContext,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../../hooks/useSocket";
import { useTasks } from "../hooks/useTasks";

type Column = {
  id: string;
  name: string;
  order: number;
};

type Task = {
  id: string;
  content: string;
  columnId: string;
};

// Componente card/tarea
function TaskCard({ id, content }: Task) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-bg rounded shadow p-2 mb-2 cursor-grab"
    >
      {content}
    </div>
  );
}

// Componente columna con zona droppable
function ColumnComponent({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[];
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const style = {
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card p-4 rounded w-64 min-h-[300px]"
    >
      <h3 className="font-semibold mb-3">{column.name}</h3>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </SortableContext>
    </div>
  );
}

export default function KanbanBoard({
  project,
}: {
  project: { columns: Column[]; id: string };
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const { data: tasksData, updateTaskColumn } = useTasks({ projectId: project.id });

  // Socket.IO hook
  const {
    onTaskMove,
    offTaskMove,
    onTaskCreate,
    offTaskCreate,
    onTaskUpdate,
    offTaskUpdate,
    onTaskDelete,
    offTaskDelete
  } = useSocket(project.id);

  // Estado local de tareas
  const [tasks, setTasks] = useState<Task[]>([]);

  // Mapear la data inicial
  useEffect(() => {
    if (tasksData) {
      setTasks(
        tasksData.map((t: any) => ({
          id: t.id,
          content: t.title,
          columnId: t.columnId,
        }))
      );
    }
  }, [tasksData]);

  // Callback para manejar movimientos de tareas desde socket
  const handleSocketTaskMove = useCallback((updatedTask: any) => {
    console.log('Socket task move received:', updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? {
            ...task,
            columnId: updatedTask.columnId,
            content: updatedTask.title || task.content
          }
          : task
      )
    );
  }, []);

  // Callback para nuevas tareas desde socket
  const handleSocketTaskCreate = useCallback((newTask: any) => {
    console.log('Socket task create received:', newTask);

    const taskToAdd: Task = {
      id: newTask.id,
      content: newTask.title,
      columnId: newTask.columnId,
    };

    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
  }, []);

  // Callback para actualización de tareas desde socket
  const handleSocketTaskUpdate = useCallback((updatedTask: any) => {
    console.log('Socket task update received:', updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id
          ? {
            ...task,
            content: updatedTask.title || task.content,
            columnId: updatedTask.columnId || task.columnId
          }
          : task
      )
    );
  }, []);

  // Callback para eliminación de tareas desde socket
  const handleSocketTaskDelete = useCallback((taskId: string) => {
    console.log('Socket task delete received:', taskId);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Configurar listeners de socket
  useEffect(() => {
    onTaskMove(handleSocketTaskMove);
    onTaskCreate(handleSocketTaskCreate);
    onTaskUpdate(handleSocketTaskUpdate);
    onTaskDelete(handleSocketTaskDelete);

    // Cleanup listeners
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

  const handleDragEnd = async (event: any) => {
    console.info("Drag event:", event);
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // Determinar la columna destino
    let newColumnId: string | undefined;

    // Si soltamos directamente en una columna
    const isColumn = project.columns.some(col => col.id === over.id);
    if (isColumn) {
      newColumnId = over.id;
    } else {
      // Si soltamos sobre otra tarea, obtener su columnId
      const overTask = tasks.find(t => t.id === over.id);
      if (overTask) {
        newColumnId = overTask.columnId;
      }
    }

    console.info("Active task:", activeTask);
    console.info("New column ID:", newColumnId);
    console.info("Current column ID:", activeTask.columnId);

    // Solo actualizar si cambiamos de columna
    if (newColumnId && activeTask.columnId !== newColumnId) {
      // Actualizar estado local inmediatamente para UX fluida
      setTasks((prev) =>
        prev.map((t) =>
          t.id === active.id ? { ...t, columnId: newColumnId } : t
        )
      );

      try {
        // Persistir en la API (esto ya emitirá el socket event)
        console.info("Updating task column:", { taskId: activeTask.id, columnId: newColumnId });
        await updateTaskColumn({ taskId: activeTask.id, columnId: newColumnId, projectId: project.id });
      } catch (error) {
        console.error("Error updating task column:", error);

        // Revertir el cambio local si hay error
        setTasks((prev) =>
          prev.map((t) =>
            t.id === active.id ? { ...t, columnId: activeTask.columnId } : t
          )
        );
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto flex-wrap">
        {project.columns.map((col) => (
          <ColumnComponent
            key={col.id}
            column={col}
            tasks={tasks.filter((t) => t.columnId === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}