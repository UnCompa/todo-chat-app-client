import { useFormik } from 'formik';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import * as Yup from 'yup';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Header from '../../../components/layout/Header';
import { useAuthStore } from '../../../store/auth/authStore';
import { useInvitationStore } from '../../../store/onboarding/invitationStore';

const floatKeyframes = (reduced: boolean | null): any =>
  reduced
    ? {}
    : {
      y: [0, -12, 0, 8, 0],
      x: [0, 6, 0, -6, 0],
      scale: [1, 0.8, 1.2, 1],
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
    };



function RegisterPage() {
  const prefersReduced = useReducedMotion();
  const { invitation } = useInvitationStore();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const callback = searchParams.get('callback'); // e.g., "invitation_request"
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre de usuario es requerido'),
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es requerida'),
  });

  const { signUp, error } = useAuthStore(state => state)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: invitation?.email ?? '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      console.info(values)
      const result = await signUp(values)
      if (result.success) {
        if (callback === 'invitation_request' && invitation?.id) {
          navigate(`/invite?inviteId=${invitation.id}&email=${invitation.email}`);
        } else {
          navigate('/onboarding');
        }
      } else {
        toast.error(error);
      }
    }
  });

  

  return (
    <>
      <Header />
      <Toaster theme='system' richColors/>
      <main className='min-h-dvh bg-surface w-full flex flex-col justify-center items-center'>
        <div className="absolute -top-40 right-32 h-[38rem] w-[38rem] rounded-full blur-3xl opacity-30 dark:opacity-20"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-400), transparent 70%)" }} />
        <motion.div
          className="absolute top-24 right-1/4 size-24 rounded-full bg-primary-400/25 dark:bg-primary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.div
          className="absolute bottom-24 left-1/5 size-16 rounded-full bg-secondary-400/25 dark:bg-secondary-300/20 blur-md"
          animate={floatKeyframes(prefersReduced)}
        />
        <motion.section
          transition={{ staggerChildren: 0.15 }}
          className='z-20 px-12 w-full md:max-w-1/2'>
          <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center text-3xl font-bold text-text font-Outfit">Registrate</motion.h1>
          <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
            <Input errorMessage={formik.errors.name} name='name' type="text" placeholder="John Doe" className="p-2 border rounded" label='Nombre de usuario' onChange={formik.handleChange} value={formik.values.name} />
            <Input errorMessage={formik.errors.email} name='email' type="email" placeholder="example@gmail.com" className="p-2 border rounded" label='Correo electrónico' onChange={formik.handleChange} value={formik.values.email} />
            <Input errorMessage={formik.errors.password} name='password' type="password" placeholder="********" className="p-2 border rounded" label='Contraseña' onChange={formik.handleChange} value={formik.values.password} />
            <Button loading={formik.isSubmitting} type="submit">Registrarse</Button>
          </form>
        </motion.section>
      </main>
    </>
  )
}

export default RegisterPage
