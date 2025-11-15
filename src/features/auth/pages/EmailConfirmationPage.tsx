import { motion, useReducedMotion, type TargetAndTransition, type Variants } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import Header from '../../../components/layout/Header';

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
      staggerChildren: 0.15,
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

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3
    },
  },
};

function EmailConfirmationPage() {
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <>
      <Header />

      <main className='min-h-dvh bg-surface w-full flex flex-col justify-center items-center relative overflow-hidden'>
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

        {/* Contenedor del mensaje */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='z-20 px-6 w-full md:max-w-md'
        >
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            {/* Icono de email */}
            <motion.div
              variants={iconVariants}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-400/20 dark:bg-primary-300/20 rounded-full blur-xl" />
                <div className="relative bg-primary-100 dark:bg-primary-900/50 p-6 rounded-full">
                  <Mail className="w-12 h-12 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-center text-3xl font-bold text-text font-Outfit mb-3"
            >
              ¡Revisa tu correo!
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <p className="text-center text-muted text-base">
                Hemos enviado un enlace de confirmación a:
              </p>
              <p className="text-center font-semibold text-text bg-gray-100 dark:bg-gray-800/80 px-4 py-3 rounded-lg break-all">
                {email}
              </p>
              <p className="text-center text-muted text-sm">
                Haz clic en el enlace del correo para activar tu cuenta y comenzar a usar la plataforma.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Button
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Ir a iniciar sesión
              </Button>

              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full flex items-center justify-center gap-2 text-muted hover:text-text transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al registro
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-center text-muted text-xs">
                ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
                <button
                  type="button"
                  className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                  onClick={() => {
                    // Aquí puedes implementar la lógica para reenviar el email
                    console.log('Reenviar email de confirmación');
                  }}
                >
                  solicita un nuevo enlace
                </button>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

export default EmailConfirmationPage;