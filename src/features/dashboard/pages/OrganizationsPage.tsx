import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/authClient";
import { useAuthStore } from "../../../store/auth/authStore";
import { useProjectStore } from "../../../store/dashboard/projectStore";
import DashboardLayout from "../components/DashboardLayout";
import { OrganizationSwitcher } from "../components/OrganizationSwitcher";

function OrganizationPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore((state) => state);
  const clearProject = useProjectStore(state => state.clearProject)
  const [organizations, setOrganizations] = useState([]);
  const [activeOrg, setActiveOrg] = useState(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.activeOrganizationId) {
      navigate("/onboarding");
      return;
    }

    const fetchData = async () => {
      try {
        // Listar organizaciones del usuario
        const { data: orgs } = await authClient.organization.list();
        setOrganizations(orgs || []);

        // Obtener la organización activa
        if (user.activeOrganizationId) {
          const { data: orgData } = await authClient.organization.getFullOrganization();
          setActiveOrg(orgData || null);
          setMembers(orgData?.members || []);
        }
      } catch (err) {
        console.error("Error al cargar datos de la organización:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando tu dashboard...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
          {/* Usuario actual */}
          <h1 className="text-2xl font-bold mb-4">
            Hola, {user?.name || user?.email}
          </h1>
          <p className="text-gray-600 mb-6">
            Estás logueado como <strong>{user?.email}</strong>
          </p>

          {/* Organización activa */}
          {activeOrg ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Organización activa</h2>
              <p>
                <strong>Nombre:</strong> {activeOrg.name}
              </p>
              <p>
                <strong>Slug:</strong> {activeOrg.slug}
              </p>
              <p>
                <strong>Rol actual:</strong>{" "}
                {members.find((m) => m.userId === user?.id)?.role || "Sin rol"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No tienes una organización activa.</p>
          )}

          {/* Todas las organizaciones del usuario */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Mis Organizaciones ({organizations.length})
            </h2>
            <ul className="list-disc list-inside text-left">
              {organizations.map((org) => (
                <li key={org.id}>
                  {org.name} <span className="text-gray-500">({org.id})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Miembros de la organización */}
          {activeOrg && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Miembros de {activeOrg.name}
              </h2>
              <ul className="divide-y divide-gray-200">
                {members.map((member) => (
                  <li key={member.id} className="py-2 flex justify-between">
                    <span>
                      {member?.user?.name || member?.user?.email}
                    </span>
                    <span className="text-gray-600 italic">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <OrganizationSwitcher
            organizations={organizations}
            activeId={user?.activeOrganizationId}
            onSwitch={(id) => {
              window.location.reload()
              clearProject()
            }}
          />
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrganizationPage;