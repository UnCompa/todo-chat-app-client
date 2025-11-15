import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { authService } from "../../services/auth/authService";
import { HelperService } from "../../services/helper/helperService";

interface Organization {
  name: string;
  slug: string;
  userId: string;
  logo: string;
  metadata: string;
  keepCurrentActiveOrganization: boolean;
}

interface Feedback {
  question: string;
  answer: string
}
const initialOrganization: Organization = {
  name: "",
  slug: "",
  userId: "",
  logo: "",
  metadata: "",
  keepCurrentActiveOrganization: true,
};

interface OnBoardingState {
  organization: Organization;
  step: number;
  invites: string[];
  feedback: Feedback[];
  isLoading: boolean; // <-- nuevo
  error: string | null; // <-- nuevo
  setInvites: (invites: string[]) => void;
  setFeedback: (feedback: Feedback) => void;
  setOrganization: (org: Partial<Organization>) => void;
  updateOrganizationField: <K extends keyof Organization>(
    key: K,
    value: Organization[K]
  ) => void;
  resetOrganization: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetAll: () => void;
  finishOnboarding: () => Promise<{ success: boolean; message: string, id?: string }>;
}

export const useOnboardingStore = create<OnBoardingState>()(
  devtools(
    persist(
      (set, get) => ({
        invites: [],
        feedback: [],
        organization: initialOrganization,
        step: 0,
        isLoading: false, // <-- inicial
        error: null, // <-- inicial
        setInvites: (invites: string[]) => set({ invites }, false, "onboarding/setInvites"),
        setFeedback: (feedback: Feedback) =>
          set((state) => {
            const existingFeedbackIndex = state.feedback.findIndex(
              (item) => item.question === feedback.question
            );
            if (existingFeedbackIndex !== -1) {
              const updatedFeedback = [...state.feedback];
              updatedFeedback[existingFeedbackIndex] = feedback;
              return { feedback: updatedFeedback };
            } else {
              return { feedback: [...state.feedback, feedback] };
            }
          }, false, "onboarding/setFeedback"),
        setOrganization: (org) =>
          set(
            (state) => ({ organization: { ...state.organization, ...org } }),
            false,
            "onboarding/setOrganization"
          ),
        updateOrganizationField: (key, value) =>
          set(
            (state) => ({ organization: { ...state.organization, [key]: value } }),
            false,
            "onboarding/updateOrganizationField"
          ),
        resetOrganization: () =>
          set({ organization: initialOrganization, step: 0, isLoading: false, error: null }),

        setStep: (step) => set({ step }, false, "onboarding/setStep"),
        nextStep: () => set((s) => ({ step: s.step + 1 })),
        prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
        resetAll: () =>
          set(
            {
              organization: initialOrganization,
              step: 0,
              invites: [],
              feedback: [],
              isLoading: false,
              error: null,
            },
            false,
            "onboarding/resetAll"
          ),
        finishOnboarding: async () => {
          set({ isLoading: true, error: null });
          const state = get();
          try {
            // 1. Crear organización
            const { name, slug, userId } = state.organization;
            const orgId = await authService.registerOrganization(name, slug, userId);

            // 2. Invitar a los usuarios
            for (const invite of state.invites) {
              await authService.inviteUser(invite, orgId);
            }

            // 3. Registrar feedback
            const helperService = new HelperService();
            for (const feedback of state.feedback) {
              await helperService.seedFeedback(feedback.question, feedback.answer);
            }

            set({ isLoading: false });
            return { success: true, message: "Onboarding completed successfully.", id: orgId }; 
          } catch (err) {
            set({ isLoading: false, error:  (err as Error).message || "Unknown error" });
            return { success: false, message: (err as Error).message || "Onboarding failed." };
          }
        },
      }),
      {
        name: "onboarding",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
