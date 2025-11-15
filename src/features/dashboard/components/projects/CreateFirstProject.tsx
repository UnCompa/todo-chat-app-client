import { useAuthStore } from "../../../../store/auth/authStore";
import { useProjectStore, type Project } from "../../../../store/dashboard/projectStore";
import { useDisclosure } from "../../hooks/useDisclore";
import { useProject } from "../../hooks/useProject";
import CreateProjectModal from "./CreateProjectModal";

function CreateFirstProject() {
  const userId = useAuthStore((state) => state.user?.id);
  const { projects, isProjectsLoading } = useProject(userId ?? "");
  const { selectedProject, setProject } = useProjectStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isProjectsLoading) {
    return <p className="text-gray-600">Cargando proyectos...</p>;
  }
  console.info("projects PROYECTOS", projects)

  const projectsData = projects?.data ?? [];
  console.info("PROYECTOS", projects)
  // Caso 1: No hay proyectos
  if (projectsData.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 mt-6">
        <p className="text-lg text-text">Aún no tienes proyectos.</p>
        <button
          onClick={() => {
            onOpen()
            console.log("Crear primer proyecto");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Crear tu primer proyecto
        </button>
        <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      </div>
    );
  }

  // Caso 2: Hay proyectos pero no se ha seleccionado ninguno
  if (!selectedProject) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-text mb-2">
          Selecciona un proyecto
        </h2>
        <ul className="flex flex-col gap-2">
          {projectsData.map((project: Project) => (
            <li key={project.id}>
              <button
                onClick={() => setProject(project)}
                className="w-full px-4 py-2 text-left bg-bg/50 rounded-lg text-text shadow-2xl cursor-pointer hover:bg-primary-500/50 transition-all"
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Caso 3: Ya hay un proyecto seleccionado → no renderiza nada
  return null;
}

export default CreateFirstProject;
