import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth/authStore";
import { useProjectStore } from "../../../store/dashboard/projectStore";
import DashboardLayout from "../components/DashboardLayout";
import KanbanBoard from "../components/KanBanBoard";
import CreateFirstProject from "../components/projects/CreateFirstProject";
import { useProjectDetails } from "../hooks/useProjectDetails";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore((state) => state);
  const { selectedProject } = useProjectStore(state => state)

  const { data: project } = useProjectDetails({userId: user?.id ?? '', projectId: selectedProject?.id ?? ''})
  useEffect(() => {
    if (!user?.activeOrganizationId) {
      navigate("/onboarding");
      return;
    }
  }, [user]);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando tu dashboard...</p>
      </div>
    );
  }
  console.info(project)
  return (
    <DashboardLayout>
      <h1 className="text-text text-2xl font-bold font-Outfit">Bienvenido a Saberium</h1>
      <CreateFirstProject />
      {
        project && <KanbanBoard project={project?.data} />
      }
    </DashboardLayout>

  );
}

export default DashboardPage;