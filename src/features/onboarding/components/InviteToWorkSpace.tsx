import { CircleX } from "lucide-react";
import { useState } from "react";
import Input from "../../../components/common/Input";
import { useOnboardingStore } from "../../../store/onboarding/onboardingStore";

function InviteToWorkSpace() {
  const { invites, setInvites } = useOnboardingStore();
  const [currentInvite, setCurrentInvite] = useState<string>("");

  const handleRemove = (index: number) => {
    setInvites(invites.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1 className="text-3xl font-Outfit font-bold text-center">Agrega a tu Equipo</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        setInvites([...invites, currentInvite]);
        setCurrentInvite('')
      }}>
        <Input type="email" label="Correo:" onChange={(e) => setCurrentInvite(e.target.value)} value={currentInvite} />
        <button hidden type="submit">Invite</button>
      </form>
      <div className="flex flex-wrap gap-4 py-4">
        {
          invites.map((invite, index) =>
            <div key={index} className="px-4 py-2 bg-primary-500/40 rounded-lg font-Outfit text-sm flex items-center gap-2">
              <span>{invite}</span>
              <button onClick={() => handleRemove(index)}>
                <CircleX />
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default InviteToWorkSpace
