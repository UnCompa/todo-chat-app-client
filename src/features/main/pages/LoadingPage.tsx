import { motion, useReducedMotion, type Variants } from "framer-motion";

const tasks = [1, 2, 3, 4]; // Simulamos 4 tareas

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const floatKeyframes = (reduced: boolean | null): any =>
  reduced
    ? {}
    : {
      y: [0, -8, 0, 6, 0],
      x: [0, 4, 0, -4, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    };

function LoadingPage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[color:var(--color-backdrop)] backdrop-blur-sm">
      {/* Fondos decorativos sutiles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid muy sutil */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100,116,139,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radiales muy sutiles */}
        <div
          className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-10 dark:opacity-8"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-400), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-24 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-8 dark:opacity-6"
          style={{ background: "radial-gradient(closest-side, var(--color-secondary-400), transparent 70%)" }}
        />
        {/* Orbes flotantes pequeños */}
        <motion.div
          className="absolute top-20 right-1/3 size-12 rounded-full bg-primary-400/15 dark:bg-primary-300/10 blur-sm"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 size-8 rounded-full bg-secondary-400/15 dark:bg-secondary-300/10 blur-sm"
          animate={floatKeyframes(prefersReduced)}
        />
      </div>

      {/* Contenido principal */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo/Marca */}
        <motion.div
          variants={fadeUp}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl font-bold font-Outfit bg-gradient-to-r from-primary-500 via-indigo-500 to-secondary-500 bg-clip-text text-transparent">
            Saberium
          </h1>
        </motion.div>

        {/* Animación de tareas */}
        <motion.div
          variants={fadeUp}
          className="flex space-x-4 mb-8"
        >
          {tasks.map((task, i) => (
            <motion.div
              key={task}
              className="relative w-10 h-10 border-2 rounded-lg border-primary-500/60 dark:border-primary-400/50 flex items-center justify-center backdrop-blur-sm"
              initial={{
                backgroundColor: "transparent",
                borderColor: "var(--color-primary-500)",
                scale: 1
              }}
              animate={{
                backgroundColor: [
                  "transparent",
                  "var(--color-primary-500)",
                  "transparent",
                ],
                borderColor: [
                  "var(--color-primary-500)",
                  "var(--color-primary-400)",
                  "var(--color-primary-500)",
                ],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatDelay: tasks.length * 0.35,
                duration: 0.7,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            >
              {/* Check mark animado */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: tasks.length * 0.35,
                  duration: 0.7,
                  delay: i * 0.35,
                  ease: "easeInOut",
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-primary-500/20 blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: tasks.length * 0.35,
                  duration: 0.7,
                  delay: i * 0.35,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Texto de carga */}
        <motion.div
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-lg font-medium text-[color:var(--color-text)] font-Outfit select-none mb-2">
            Cargando tareas...
          </p>
          <motion.p
            className="text-sm text-[color:var(--color-muted)] font-WorkSans select-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Preparando tu espacio de trabajo
          </motion.p>
        </motion.div>

        {/* Barra de progreso sutil (opcional) */}
        <motion.div
          variants={fadeUp}
          className="mt-6 w-48 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoadingPage;