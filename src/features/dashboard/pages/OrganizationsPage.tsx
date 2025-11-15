import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/authClient";
import { useAuthStore } from "../../../store/auth/authStore";
import { useProjectStore } from "../../../store/dashboard/projectStore";
import DashboardLayout from "../components/DashboardLayout";
import { OrganizationSwitcher } from "../components/OrganizationSwitcher";
import AddMembersModal from "../components/organization/AddMembersModal";
import { useDisclosure } from "../hooks/useDisclore";

function OrganizationPage() {
  const navigate = useNavigate();
  const {  user } = useAuthStore((state) => state);
  const clearProject = useProjectStore((state) => state.clearProject);
  const [organizations, setOrganizations] = useState([]);
  const [activeOrg, setActiveOrg] = useState(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {isOpen, onClose, onOpen} = useDisclosure()
  useEffect(() => {
    if (!user?.activeOrganizationId) {
      navigate("/onboarding");
      return;
    }

    const fetchData = async () => {
      try {
        const { data: orgs } = await authClient.organization.list();
        setOrganizations(orgs || []);

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
          <p className="text-[var(--color-muted)]">Cargando tu dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[var(--color-bg)] p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
              Hola, <span className="text-[var(--color-primary-600)]">{user?.name || user?.email}</span>
            </h1>
            <p className="mt-2 text-[var(--color-muted)]">
              Estás logueado como <strong>{user?.email}</strong>
            </p>
          </div>

          {/* Tarjeta principal */}
          <div className="card space-y-6">
            {/* Organización activa */}
            {activeOrg ? (
              <section>
                <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">Organización activa</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--color-text)]">
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Nombre</p>
                    <p className="font-medium">{activeOrg.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Slug</p>
                    <p className="font-mono text-sm bg-[var(--color-elev-2)] px-2 py-1 rounded inline-block">
                      {activeOrg.slug}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-muted)]">Tu rol</p>
                    <p className="font-medium">
                      {members.find((m) => m.userId === user?.id)?.role || "Sin rol"}
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <p className="text-[var(--color-muted)]">No tienes una organización activa.</p>
            )}

            <div className="divider"></div>

            {/* Mis organizaciones */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-[var(--color-text)]">
                  Mis Organizaciones
                </h2>
                <span className="text-sm text-[var(--color-muted)]">
                  {organizations.length} {organizations.length === 1 ? 'organización' : 'organizaciones'}
                </span>
              </div>
              {organizations.length > 0 ? (
                <ul className="space-y-2">
                  {organizations.map((org) => (
                    <li
                      key={org.id}
                      className={`p-3 rounded-lg border ${org.id === user?.activeOrganizationId
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-950)]'
                          : 'border-[var(--color-border)]'
                        }`}
                    >
                      <div className="font-medium text-[var(--color-text)]">{org.name}</div>
                      <div className="text-xs text-[var(--color-muted)] mt-1">ID: {org.id}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[var(--color-muted)] italic">No perteneces a ninguna organización.</p>
              )}
            </section>

            <div className="divider"></div>

            {/* Miembros */}
            {activeOrg && (
              <section>
                <div className="flex justify-between py-4">
                  <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                    Miembros de <span className="text-[var(--color-primary-600)]">{activeOrg.name}</span>
                  </h2>
                  <Button size="sm" onClick={() => onOpen()}> 
                    <Plus className="text-xs"/>
                  </Button>
                </div>
                {members.length > 0 ? (
                  <ul className="space-y-2">
                    {members.map((member) => (
                      <li
                        key={member.id}
                        className="flex justify-between items-center p-3 rounded-lg bg-[var(--color-elev-2)]"
                      >
                        <span className="font-medium text-[var(--color-text)]">
                          {member?.user?.name || member?.user?.email}
                        </span>
                        <span className="text-sm text-[var(--color-muted)] italic">{member.role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[var(--color-muted)] italic">No hay miembros en esta organización.</p>
                )}
              </section>
            )}

            <div className="divider"></div>

            {/* Switcher y logout */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <OrganizationSwitcher
                  organizations={organizations}
                  activeId={user?.activeOrganizationId}
                  onSwitch={() => {
                    clearProject();
                    window.location.reload();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddMembersModal isOpen={isOpen} onClose={onClose}/>
    </DashboardLayout>
  );
}

export default OrganizationPage;