import { useOnboardingStore } from '@/store/onboarding/onboardingStore';
import { useFormik } from 'formik';
import { motion, useReducedMotion, type TargetAndTransition, type Variants } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import * as Yup from 'yup';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Header from '../../../components/layout/Header';
import { useAuthStore } from '../../../store/auth/authStore';
import { useInvitationStore } from '../../../store/onboarding/invitationStore';

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

function RegisterPage() {
  const prefersReduced = useReducedMotion();
  const { invitation } = useInvitationStore();
  const resetAll = useOnboardingStore(state => state.resetAll)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const callback = searchParams.get('callback');

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre de usuario es requerido'),
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
  });

  const { signUp, error } = useAuthStore(state => state);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: invitation?.email ?? '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      const result = await signUp(values);
      if (result.success) {
        toast.success("¡Cuenta creada exitosamente!");
        if (callback === 'invitation_request' && invitation?.id) {
          navigate(`/invite?inviteId=${invitation.id}&email=${invitation.email}`);
        } else {
          resetAll()
          navigate('/email-confirmation', {
            state: { email: values.email }
          });
        }
      } else {
        toast.error(error || "Error al crear la cuenta");
      }
    }
  });

  return (
    <>
      <Header />
      <Toaster theme='system' richColors />

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

        {/* Contenedor del formulario */}
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
            <motion.h1
              variants={itemVariants}
              className="text-center text-3xl font-bold text-text font-Outfit mb-2"
            >
              Crea tu cuenta
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-center text-muted text-sm mb-8"
            >
              Únete y comienza tu experiencia
            </motion.p>

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <motion.div variants={itemVariants}>
                <Input
                  errorMessage={formik.errors.name}
                  name='name'
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  label='Nombre de usuario'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  errorMessage={formik.errors.email}
                  name='email'
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  label='Correo electrónico'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input
                  errorMessage={formik.errors.password}
                  name='password'
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200"
                  label='Contraseña'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  loading={formik.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Crear cuenta
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center pt-4">
                <p className="text-muted text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-primary-600 dark:text-primary-400 font-semibold hover:underline transition-colors"
                  >
                    Inicia sesión aquí
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

export default RegisterPage;