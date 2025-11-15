import { Dropdown } from "@/components/common/Dropdown";
import { authClient } from "../../../lib/authClient";

export function OrganizationSwitcher({ organizations, activeId, onSwitch }) {
  const handleSwitch = async (orgId: string) => {
    await authClient.organization.setActive({ organizationId: orgId });
    onSwitch(orgId); // notificamos al padre para refrescar datos
  };

  const options = organizations.map((org) => ({
    label: org.name, value: org.id
  }))

  return (
    <div className="mb-6">
      <label className="font-semibold px-4">Cambiar organización:</label>
      <Dropdown value={activeId} items={options} onSelect={(item) => handleSwitch(item.value as string)} />
    </div>
  );
}