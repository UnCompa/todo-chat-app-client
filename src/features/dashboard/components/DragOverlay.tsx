import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import type { Task } from "../types/task.interface";
import TaskCard from "./common/TaskCard";

interface CustomDragOverlayProps {
  activeTask: Task | null;
}

export const CustomDragOverlay = ({ activeTask }: CustomDragOverlayProps) => {
  return createPortal(
    <DragOverlay
      adjustScale={false}
      dropAnimation={{
        duration: 200,
        easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
      }}
    >
      {activeTask && (
        <div className="rotate-3 scale-105 shadow-2xl border-2 border-blue-400">
          <TaskCard {...activeTask} />
        </div>
      )}
    </DragOverlay>,
    document.body
  );
};
