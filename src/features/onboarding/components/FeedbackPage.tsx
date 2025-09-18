import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useOnboardingStore } from "../../../store/onboarding/onboardingStore";

// Preguntas de onboarding
const feedbackQuestions = [
  {
    question: "¿Para qué planeas usar la herramienta?",
    options: ["Trabajo", "Estudio", "Personal", "Otro"],
  },
  {
    question: "¿Cuántas personas usarán la herramienta?",
    options: ["Solo yo", "2-5", "6-10", "Más de 10"],
  },
  {
    question: "¿Cómo calificarías tu experiencia con herramientas similares?",
    options: [
      { value: "Buena", icon: ThumbsUp },
      { value: "Mala", icon: ThumbsDown },
    ],
  },
];

export default function FeedbackPage() {
  const { feedback, setFeedback } = useOnboardingStore();
  // feedback: { question: string, answer: string }[]

  const handleAnswer = (question: string, answer: string) => {

    setFeedback({ question, answer });

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[color:var(--color-bg)] text-[color:var(--color-text)] px-6 py-12">
      <h1 className="font-Outfit text-3xl font-bold mb-4 text-center">
        Cuéntanos un poco sobre ti
      </h1>
      <p className="text-[color:var(--color-muted)] text-center mb-8 font-WorkSans">
        Queremos personalizar tu experiencia. Responde estas preguntas para empezar.
      </p>

      <div className="w-full max-w-2xl space-y-8">
        {feedbackQuestions.map((q) => (
          <div key={q.question} className="space-y-3">
            <h2 className="font-Outfit font-semibold text-xl">{q.question}</h2>
            <div className="flex flex-wrap gap-4">
              {q.options.map((opt: any) => {
                const value = typeof opt === "string" ? opt : opt.value;
                const Icon = typeof opt === "string" ? null : opt.icon;

                // Verificar si esta opción está seleccionada
                const selected = feedback.find(
                  (f) => f.question === q.question && f.answer === value
                );

                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(q.question, value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-WorkSans border transition-all ${selected
                      ? "bg-primary-500 text-white border-primary-500"
                      : "bg-[color:var(--color-elev-2)] border-[color:var(--color-border)] text-[color:var(--color-text)] hover:bg-[color:var(--color-elev-1)]"
                      }`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
