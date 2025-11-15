import { useOnboardingStore } from "@/store/onboarding/onboardingStore";
import { motion, useReducedMotion, type TargetAndTransition, type Variants } from "framer-motion";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import Header from "../../../components/layout/Header";
import { useAuthStore } from "../../../store/auth/authStore";

const floatKeyframes = (reduced: boolean | null): TargetAndTransition =>
  reduced
    ? {}
    : {
      y: [0, -12, 0, 8, 0],
      x: [0, 6, 0, -6, 0],
      scale: [1, 0.98, 1.02, 1],
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
    };

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function LoginPage() {
  const prefersReduced = useReducedMotion();
  const { login, error } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetAll = useOnboardingStore(state => state.resetAll)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login({ email, password });
    setIsLoading(false);

    if (result.success) {
      toast.success("¡Bienvenido de vuelta!");
      resetAll()
      navigate("/dashboard");
    } else {
      toast.error(error || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Saberium</title>
        <meta name="description" content="Inicia sesión en Saberium para acceder a tus herramientas de productividad." />
      </Helmet>
      <Header />

      <main className="min-h-dvh bg-surface w-full flex flex-col justify-center items-center relative overflow-hidden">
        {/* Efectos de fondo decorativos */}
        <div
          className="absolute -top-40 right-32 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-30 dark:opacity-20"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-400), transparent 70%)" }}
        />
        <motion.div
          className="absolute top-24 right-1/4 size-24 rounded-full bg-primary-400/25 dark:bg-primary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.div
          className="absolute bottom-24 left-1/5 size-16 rounded-full bg-secondary-400/25 dark:bg-secondary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 size-20 rounded-full bg-primary-300/20 dark:bg-primary-400/15 blur-lg"
          animate={floatKeyframes(prefersReduced)}
          style={{ animationDelay: '2s' }}
        />

        {/* Contenedor del formulario */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-20 px-6 w-full md:max-w-md"
        >
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-center text-3xl font-bold text-text font-Outfit mb-2"
            >
              Bienvenido de vuelta
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-center text-muted text-sm mb-8"
            >
              Ingresa tus credenciales para continuar
            </motion.p>

            <form onSubmit={handleLogin} className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-text font-medium mb-2 text-sm">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="tu@email.com"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-text font-medium mb-2 text-sm">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Ingresando...
                  </div>
                ) : (
                  "Ingresar"
                )}
              </motion.button>

              <motion.div variants={itemVariants} className="text-center pt-4">
                <p className="text-muted text-sm">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-primary-600 dark:text-primary-400 font-semibold hover:underline transition-colors"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

export default LoginPage;