import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { authService } from "@/services/auth/authService";
import { useAuthStore } from "@/store/auth/authStore";
import { CircleX } from "lucide-react";
import { useState } from "react";

interface AddMembersModalProps {
  isOpen: boolean
  onClose: () => void
}

function AddMembersModal({ isOpen, onClose }: AddMembersModalProps) {
  const [invites, setInvites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [currentInvite, setCurrentInvite] = useState<string>("");
  const user = useAuthStore(state => state.user)
  const handleRemove = (index: number) => {
    setInvites(invites.filter((_, i) => i !== index));
  }

  const handleInvitation = async () => {
    try {
      if (!user?.activeOrganizationId) return;
      setLoading(true)
      for (const invite of invites) {
        await authService.inviteUser(invite, user.activeOrganizationId);
      }
      setLoading(false)
      onClose()
    } catch (error) {
      console.error((error as Error).message)
      setLoading(false)
      
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Añade mas miembros a tu equipo!" footer={
        <div>
          <Button loading={loading} onClick={() => handleInvitation()} disabled={invites.length === 0}>Invitar!</Button>
        </div>
      }>
        <form onSubmit={(e) => {
          e.preventDefault()
          setInvites([...invites, currentInvite]);
          setCurrentInvite('')
        }}>
          <Input type="email" label="Correos:" placeholder="example@gmail.com" onChange={(e) => setCurrentInvite(e.target.value)} value={currentInvite} />
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
      </Modal>
    </>
  )
}

export default AddMembersModal