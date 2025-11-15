import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Input from '@/components/common/Input'
import { Skeleton } from '@/components/common/Skeleton'
import { authClient } from '@/lib/authClient'
import { useAuthStore } from '@/store/auth/authStore'
import { useProjectStore } from '@/store/dashboard/projectStore'
import { Form, Formik } from 'formik'
import { Loader2, LogOut, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import * as Yup from 'yup'
import DashboardLayout from '../components/DashboardLayout'

type User = {
  id: string
  name?: string
  email: string
  emailVerified?: boolean
  image?: string
}

interface Account {
  id: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  scopes: string[];
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const logout = useAuthStore(state => state.logout)
  const { clearProject } = useProjectStore(state => state)

  // Cargar datos del usuario y cuentas
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await authClient.getSession()
        if (session?.data?.user) {
          setUser(session.data.user as User)
        }

        // Obtener cuentas vinculadas (si tu backend lo soporta)
        const accounts = await authClient.listAccounts();
        if (accounts) {
          setAccounts(accounts.data)
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error)
        toast.error('No se pudo cargar tu perfil')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSignOut = async () => {
    try {
      await logout()
      clearProject()
      toast.success('Sesión cerrada correctamente')
      // Opcional: redirigir al login
      window.location.href = '/login'
    } catch (error) {
      console.error((error as Error).message)
      toast.error('Error al cerrar sesión')
    }
  }

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Contraseña actual requerida'),
    newPassword: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Nueva contraseña requerida'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
      .required('Confirmación requerida'),
  })

  const handlePasswordChange = async (values: {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }) => {
    setIsChangingPassword(true)
    try {
      const { error } = await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true, // Opcional: invalida otras sesiones
      });

      if (error) {
        toast.error(error.message || 'Error al cambiar la contraseña');
      } else {
        toast.success('Contraseña actualizada correctamente');
      }
    } catch (error) {
      console.error((error as Error).message)
      toast.error('Error de red al cambiar la contraseña')
    } finally {
      setIsChangingPassword(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Mi Perfil</h1>
          <p className="text-muted-foreground text-placeholder">Administra tu cuenta y preferencias</p>
        </div>

        {/* Información del usuario */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Información personal</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Nombre:</span> {user?.name || '—'}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p>
              <span className="font-medium">Verificado:</span>{' '}
              {user?.emailVerified ? '✅ Sí' : '❌ No'}
            </p>
            {user?.image && (
              <div>
                <span className="font-medium">Foto:</span>
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mt-2"
                />
              </div>
            )}
          </div>
        </Card>

        {/* Cuentas vinculadas */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cuentas conectadas</h2>
          {accounts.length > 0 ? (
            <ul className="space-y-2">
              {accounts.map((account, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Shield className="text-muted-foreground" size={16} />
                  <span className="capitalize">{account.providerId}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No tienes cuentas externas vinculadas.</p>
          )}
        </Card>

        {/* Cambiar contraseña */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cambiar contraseña</h2>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={changePasswordSchema}
            onSubmit={handlePasswordChange}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form className="space-y-4">
                <Input
                  name="currentPassword"
                  type="password"
                  placeholder="Contraseña actual"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currentPassword}
                //errorMessage={touched.currentPassword && errors.currentPassword}
                />
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="Nueva contraseña"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                //errorMessage={touched.newPassword && errors.newPassword}
                />
                <Input
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirmar nueva contraseña"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmNewPassword}
                //errorMessage={touched.confirmNewPassword && errors.confirmNewPassword}
                />
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Actualizando...
                    </>
                  ) : (
                    'Cambiar contraseña'
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>

        {/* Cerrar sesión */}
        <Card className="p-6 border-destructive/20 bg-destructive/5">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Cerrar sesión</h2>
          <p className="text-muted-foreground mb-4">
            ¿Estás seguro? Se cerrará tu sesión en todos los dispositivos.
          </p>
          <Button
            onClick={handleSignOut}
            className="gap-2"
          >
            <LogOut size={16} />
            Cerrar sesión
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage