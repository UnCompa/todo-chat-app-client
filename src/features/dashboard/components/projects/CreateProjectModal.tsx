import { useFormik } from 'formik'
import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import * as Yup from 'yup'
import Button from '../../../../components/common/Button'
import Input from '../../../../components/common/Input'
import Modal from '../../../../components/common/Modal'
import { useAuthStore } from '../../../../store/auth/authStore'
import { useProject } from '../../hooks/useProject'

function CreateProjectModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const userId = useAuthStore((state) => state.user?.id);
  const { createProject, isCreatingProject } = useProject(userId ?? "");

  const createProjectSchema = Yup.object().shape({
    name: Yup.string().min(6, 'Debe ser minimo de 6 caracteres'),
    description: Yup.string().required('La descripcion es requerida')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: createProjectSchema,
    onSubmit: async (values) => {
      console.info(values)
      await createProject({ name: values.name, description: values.description })
    },
  })

  useEffect(() => {
    if (isCreatingProject) {
      toast.success('Proyecto creado')
      onClose()
    } else {
      toast.error('Error al crear el proyecto')
    }
  }, [isCreatingProject])

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()}
      title="Confirmar acción"
      footer={
        <>
          <button
            onClick={() => onClose()}
            className="px-4 py-2 rounded-lg border border-[var(--color-border)]"
          >
            Cancelar
          </button>
          <Button loading={formik.isSubmitting} type='button' onClick={() => formik.handleSubmit()} className="px-4 py-2 rounded-lg bg-[var(--color-primary-500)] text-white">
            Crear
          </Button>
        </>
      }
    >
      <Toaster/>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label='Nombre del proyecto'
          value={formik.values.name}
          onChange={formik.handleChange}
          errorMessage={formik.errors.name}
          name='name'
        />
        <Input
          label='Descripción del proyecto'
          value={formik.values.description}
          onChange={formik.handleChange}
          name='description'
          errorMessage={formik.errors.description}
        />
        <button type='submit' hidden></button>
      </form>
    </Modal>
  )
}

export default CreateProjectModal