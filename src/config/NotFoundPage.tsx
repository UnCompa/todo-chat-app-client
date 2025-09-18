import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom"; // ajusta si usas Next.js o React Router

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function NotFoundPage() {

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-[color:var(--color-bg)] text-[color:var(--color-text)] px-6 text-center overflow-hidden">
      {/* Fondo decorativo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blobs radiales */}
        <div
          className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20 dark:opacity-10"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-400), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20 dark:opacity-10"
          style={{ background: "radial-gradient(closest-side, var(--color-secondary-400), transparent 70%)" }}
        />
      </div>

      {/* Contenido */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 max-w-2xl space-y-6"
      >
        {/* Código de error */}
        <motion.h1
          variants={fadeUp}
          className="font-Outfit font-bold text-7xl sm:text-8xl bg-gradient-to-r from-primary-500 via-indigo-500 to-secondary-500 bg-clip-text text-transparent select-none"
        >
          404
        </motion.h1>

        {/* Título */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl font-semibold font-Outfit"
        >
          ¡Ups! No encontramos esta página
        </motion.h2>

        {/* Descripción */}
        <motion.p
          variants={fadeUp}
          className="text-[color:var(--color-muted)] font-WorkSans text-base sm:text-lg"
        >
          Parece que la página que buscas se perdió entre tus tareas.
          Verifica la URL o vuelve al inicio.
        </motion.p>

        {/* Acciones */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="btn btn-primary px-6 py-3 text-base rounded-lg"
          >
            Volver al inicio
          </Link>
          <Link
            to="/soporte"
            className="btn btn-ghost px-6 py-3 text-base rounded-lg"
          >
            Contactar soporte
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;