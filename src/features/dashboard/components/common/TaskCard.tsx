import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Para usar español
import ReactHTMLParser from 'html-react-parser';
import { Link } from "react-router-dom";
import type { Task } from "../../types/task.interface";
dayjs.locale("es");

function TaskCard(task: Task) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Link
      to={`/dashboard/tasks/${task.id}`}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-surface rounded-xl shadow-md p-3 mb-3 hover:cursor-pointer target:cursor-grab border border-white/10 hover:shadow-lg transition"
      >
        {/* Header: título + prioridad */}
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-text line-clamp-1">
            {task.title}
          </h4>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === "high" || task.priority === "Alta"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium" || task.priority === "Media"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
              }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="text-sm text-[--color-text] line-clamp-2 mb-2">
          {ReactHTMLParser(task.description)}
        </div>

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.labels.map((l) => (
              <span
                key={l.labelId}
                className="text-xs px-2 py-0.5 rounded-md text-white"
                style={{ backgroundColor: l.label.color }}
              >
                {l.label.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer: fecha + asignados */}
        <div className="flex justify-between items-center">
          {/* Fecha límite */}
          {task.dueDate && (
            <span className="flex items-center text-xs text-gray-400">
              📅 {dayjs(task.dueDate).format("DD MMM")}
            </span>
          )}

          {/* Asignados */}
          <div className="flex -space-x-2">
            {task.assignees.map((a) => (
              <div
                key={a.id}
                className="w-6 h-6 rounded-full bg-gray-300 text-xs flex items-center justify-center border border-white shadow"
                title={a.user.name}
              >
                {a.user.image ? (
                  <img
                    src={a.user.image}
                    alt={a.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  a.user.name.charAt(0).toUpperCase()
                )}
              </div>
            ))}
          </div>
        </div>
      </div></Link>
  );
}

export default TaskCard;
