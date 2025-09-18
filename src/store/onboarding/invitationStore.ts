// stores/useInvitationStore.ts
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface InviteData {
  id: string;
  email: string
}

interface InvitationStore {
  invitation: InviteData | null;
  setInvitation: (invitation: InviteData) => void;
  clearInvitation: () => void;
}

export const useInvitationStore = create<InvitationStore>()(
  devtools(
    persist(
      (set) => ({
        invitation: null,
        setInvitation: (invitation: InviteData) => set({ invitation }, false, 'invitation/set'),
        clearInvitation: () => set({ invitation: null }),
      }),
      {
        name: 'invitation-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
