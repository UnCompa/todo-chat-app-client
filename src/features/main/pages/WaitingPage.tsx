import { motion } from 'framer-motion';

function WaitingPage() {
  // Animación de checkboxes completados
  const checkboxVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    checked: {
      backgroundColor: 'var(--color-primary-600)',
      borderColor: 'var(--color-primary-600)',
    },
  };


  // Animación del check mark
  const checkVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  // Contenedor con animación secuencial
  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.6 },
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen fixed top-0 z-50 w-full flex items-center justify-center bg-[color:var(--color-bg)] px-4">
      <div className="text-center w-full max-w-md">
        {/* Logo / Título */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[color:var(--color-primary-500)] flex items-center justify-center shadow-[var(--shadow-elevation-2)]">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[color:var(--color-text)]" style={{ fontFamily: 'var(--font-Outfit)' }}>
            Saberium
          </h1>
        </motion.div>

        {/* Lista de tareas */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="bg-[color:var(--color-surface)] rounded-2xl shadow-[var(--shadow-elevation-2)] p-8 border border-[color:var(--color-border)] space-y-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-lg font-semibold text-[color:var(--color-text)]"
            style={{ fontFamily: 'var(--font-WorkSans)' }}
          >
            Configurando tu espacio de trabajo...
          </motion.h2>

          <div className="space-y-4">
            {/* Tarea completada */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <motion.div
                variants={checkboxVariants}
                initial="initial"
                animate={['animate', 'checked']}
                className="w-5 h-5 rounded border-2 flex items-center justify-center"
                style={{
                  borderColor: 'var(--color-primary-600)',
                  backgroundColor: 'var(--color-primary-600)',
                }}
              >
                <motion.svg
                  variants={checkVariants}
                  initial="initial"
                  animate="animate"
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-[color:var(--color-neutral-200)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary-500)' }}
                  />
                </div>
                <p className="text-sm text-[color:var(--color-muted)] mt-1 line-through">Inicializando componentes</p>
              </div>
            </motion.div>

            {/* Tarea en progreso */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: 'var(--color-primary-600)' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-primary-600)' }}
                />
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-[color:var(--color-neutral-200)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-secondary-500)' }}
                  />
                </div>
                <p className="text-sm text-[color:var(--color-muted)] mt-1">Cargando tus datos</p>
              </div>
            </motion.div>

            {/* Tarea pendiente */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded border-2" style={{ borderColor: 'var(--color-neutral-300)' }} />
              <div className="flex-1">
                <div className="h-2 rounded-full bg-[color:var(--color-neutral-200)]" />
                <p className="text-sm mt-1 text-[color:var(--color-muted)]">Preparando interfaz</p>
              </div>
            </motion.div>
          </div>

          {/* Indicador de puntos animados */}
          <motion.div className="mt-8 flex justify-center items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--color-primary-400)' }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Mensaje adicional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-6 text-sm text-[color:var(--color-muted)]"
          style={{ fontFamily: 'var(--font-WorkSans)' }}
        >
          Esto solo tomará unos segundos...
        </motion.p>
      </div>
    </div>
  );
}

export default WaitingPage;
