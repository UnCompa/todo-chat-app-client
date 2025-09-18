import { authClient } from "../../../lib/authClient";

export function OrganizationSwitcher({ organizations, activeId, onSwitch }) {
  const handleSwitch = async (orgId: string) => {
    await authClient.organization.setActive({ organizationId: orgId });
    onSwitch(orgId); // notificamos al padre para refrescar datos
  };

  return (
    <div className="mb-6">
      <label className="font-semibold">Cambiar organización:</label>
      <select
        className="ml-2 border px-2 py-1"
        value={activeId}
        onChange={(e) => handleSwitch(e.target.value)}
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
}