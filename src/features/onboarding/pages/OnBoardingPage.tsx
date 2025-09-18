import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/auth/authStore";

import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import { useOnboardingStore } from "../../../store/onboarding/onboardingStore";
import WaitingPage from "../../main/pages/WaitingPage";
import CreateWorkSpace from "../components/CreateWorkSpace";
import FeedbackPage from "../components/FeedbackPage";
import InviteToWorkSpace from "../components/InviteToWorkSpace";

function OnBoardingPage() {
  const navigate = useNavigate();
  const { step, nextStep, prevStep, isLoading, finishOnboarding, resetAll } = useOnboardingStore();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore(s => s.setUser);

  // 🚀 Si ya tiene organización activa => dashboard
  useEffect(() => {
    if (user?.activeOrganizationId) {
      navigate("/dashboard");
    }
  }, [user]);


  // pasos
  const steps = [
    { id: 0, component: <CreateWorkSpace /> },
    { id: 1, component: <InviteToWorkSpace /> },
    {
      id: 2, component: <FeedbackPage />
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-surface text-text">
      <Header variant="relative" />
      <div className="w-full max-w-3xl mx-auto px-6 py-8">
        {/* Progreso */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`flex-1 h-2 mx-1 rounded-full transition-all ${i <= step
                ? "bg-primary-500"
                : "bg-neutral-200 dark:bg-neutral-700"
                }`}
            />
          ))}
        </div>

        {/* Contenido dinámico */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[color:var(--color-surface)] rounded-2xl shadow-md p-8"
        >
          {steps[step].component}
        </motion.div>

        {/* Controles */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="btn btn-ghost px-6 py-2 disabled:opacity-40"
          >
            Atrás
          </button>
          <button
            onClick={async () => {
              if (step === steps.length - 1) {
                const result = await finishOnboarding()
                console.info("Completado", result)
                if (result.success) {
                  setUser({ activeOrganizationId: result.id })
                  resetAll()
                  navigate("/dashboard");
                }
              } else {
                nextStep();
              }
            }}
            className="btn btn-primary px-6 py-2"
          >
            {step === steps.length - 1 ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
      {
        isLoading && <WaitingPage />
      }
    </div>
  );
}

export default OnBoardingPage;
