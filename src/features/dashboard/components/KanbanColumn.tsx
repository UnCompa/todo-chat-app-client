import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { cn } from "../../../utils/cn";
import type { Column } from "../types/project-detail-interface";
import type { Task } from "../types/task.interface";
import TaskCard from "./common/TaskCard";


interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
}

export const KanbanColumn = ({ column, tasks }: KanbanColumnProps) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: column.id,
  });

  const isActiveColumn = active && tasks.some(task => task.id === active.id);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col bg-bg rounded-lg p-4 w-80 min-h-[500px] transition-all duration-200",
        "border-2 border-transparent",
        {
          "border-blue-300 bg-backdrop shadow-md": isOver,
          "shadow-sm border-primary-500": !isOver,
          "ring-2 ring-blue-200": isActiveColumn && !isOver,
        }
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text text-lg">{column.name}</h3>
        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Drop Zone Indicator */}
      {isOver && (
        <div className="bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg p-4 mb-3 flex items-center justify-center">
          <span className="text-blue-600 text-sm font-medium">
            Suelta aquí la tarea
          </span>
        </div>
      )}

      {/* Tasks Container */}
      <div className="flex-1 space-y-2">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </SortableContext>

        {/* Empty State */}
        {tasks.length === 0 && !isOver && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="text-sm">No hay tareas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
