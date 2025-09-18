import { motion, useReducedMotion, type Variants } from "framer-motion";
import Navigate from "../../../components/common/Navigate";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const floatKeyframes = (reduced: boolean | null): any =>
  reduced
    ? {}
    : {
      y: [0, -12, 0, 8, 0],
      x: [0, 6, 0, -6, 0],
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
    };

function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative bg-[color:var(--color-surface)] min-h-dvh flex items-center">
      {/* Fondos decorativos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid sutil */}
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100,116,139,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.15) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Radiales de color */}
        <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-30 dark:opacity-20"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-400), transparent 70%)" }} />
        <div className="absolute -bottom-48 -right-32 h-[42rem] w-[42rem] rounded-full blur-3xl opacity-25 dark:opacity-20"
          style={{ background: "radial-gradient(closest-side, var(--color-secondary-400), transparent 70%)" }} />
        {/* Orbes animados */}
        <motion.div
          className="absolute top-24 right-1/4 size-24 rounded-full bg-primary-400/25 dark:bg-primary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.div
          className="absolute bottom-24 left-1/5 size-16 rounded-full bg-secondary-400/25 dark:bg-secondary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
      </div>

      {/* Contenido */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 md:py-28 flex flex-col items-center text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[color:var(--color-text)] font-Outfit font-bold text-4xl sm:text-5xl md:text-6xl leading-tight"
        >
          Trabaja de manera colaborativa con{" "}
          <span className="bg-gradient-to-r from-primary-500 via-indigo-500 to-secondary-500 bg-clip-text text-transparent">
            Saberium
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-3xl text-neutral-600 dark:text-neutral-300 font-WorkSans text-base sm:text-lg"
        >
          Organiza tareas, coordina equipos y entrega a tiempo. Centraliza tus pendientes,
          automatiza flujos y mantén la claridad en cada proyecto.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <Navigate to="/login">
            Empieza gratis
          </Navigate>
          <Navigate to="/colaborate" variant="outline">
            Colaborar
          </Navigate>
        </motion.div>
        {/* Métricas de confianza */}
        <motion.ul
          variants={fadeUp}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left font-WorkSans"
        >
          <li className="card py-4 px-5 bg-[color:var(--color-elev-1)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-elev-1)]/60">
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">+10k</p>
            <p className="text-sm text-[color:var(--color-muted)]">Equipos activos</p>
          </li>
          <li className="card py-4 px-5 bg-[color:var(--color-elev-1)]/70 backdrop-blur">
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">99.9%</p>
            <p className="text-sm text-[color:var(--color-muted)]">Uptime</p>
          </li>
          <li className="card py-4 px-5 bg-[color:var(--color-elev-1)]/70 backdrop-blur">
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">100%</p>
            <p className="text-sm text-[color:var(--color-muted)]">Tiempo a entrega</p>
          </li>
          <li className="card py-4 px-5 bg-[color:var(--color-elev-1)]/70 backdrop-blur">
            <p className="text-2xl font-semibold text-[color:var(--color-text)]">100%</p>
            <p className="text-sm text-[color:var(--color-muted)]">Seguridad</p>
          </li>
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default Hero;