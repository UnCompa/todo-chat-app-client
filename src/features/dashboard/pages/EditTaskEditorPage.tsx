import { Breadcrumb } from '@/components/common/Breadcrum'
import Button from '@/components/common/Button'
import { Dropdown } from '@/components/common/Dropdown'
import Input from '@/components/common/Input'
import { Skeleton } from '@/components/common/Skeleton'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useAuthStore } from '@/store/auth/authStore'
import { useProjectStore } from '@/store/dashboard/projectStore'
import { Form, Formik } from 'formik'
import { AlertCircle, ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import DashboardLayout from '../components/DashboardLayout'
import { useProjectDetails } from '../hooks/useProjectDetails'
import { useTaskDetails } from '../hooks/useTaskDetails'
import { useTasks } from '../hooks/useTasks'
import type { CreateTask } from '../types/create-task.interface'

function EditTaskEditorPage() {
  const { id } = useParams()
  const { data: taskDetails, isLoading: isLoadingTask } = useTaskDetails(id ?? "")
  const { selectedProject } = useProjectStore(state => state)
  const user = useAuthStore(state => state.user)
  const { data: projectData } = useProjectDetails({ userId: user?.id ?? "", projectId: selectedProject?.id ?? "" })
  const { updateTask, updateTaskError, updateTaskPending, updateTaskSuccess, deleteTask } = useTasks({ projectId: selectedProject?.id ?? "" })
  const navigate = useNavigate()
  

  const breadcrumbItems = [
    { label: selectedProject?.name ?? "", href: "/dashboard" },
    { label: "Editar tarea" },
  ]


  useEffect(() => {
    if (updateTaskSuccess) {
      toast.success('Tarea actualizada correctamente')
    }
    if (updateTaskError) {
      toast.error(updateTaskError.message || 'Error al actualizar la tarea')
    }
  }, [updateTaskSuccess, updateTaskError])

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.altKey) {
        document.getElementById("submit-task")?.click()
      }
    }
    document.addEventListener("keydown", handleKeys)
    return () => document.removeEventListener("keydown", handleKeys)
  }, [])

  const taskPriorityItems = [
    { label: "Baja", value: "low", icon: <ArrowDown size={16} className="text-blue-500" /> },
    { label: "Media", value: "medium", icon: <Minus size={16} className="text-yellow-500" /> },
    { label: "Alta", value: "high", icon: <ArrowUp size={16} className="text-orange-500" /> },
    { label: "Crítica", value: "critical", icon: <AlertCircle size={16} className="text-red-600" /> },
  ]

  const columns = projectData?.data.columns.map((col) => ({
    label: col.name,
    value: col.id
  })) || []

  // Mostrar skeleton mientras se carga la tarea
  if (isLoadingTask) {
    return (
      <DashboardLayout spacing={false}>
        <div className="p-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-full mb-2" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-40 w-full" />
        </div>
      </DashboardLayout>
    )
  }

  // Si ya se cargó la tarea pero aún no el proyecto, puedes manejarlo si es necesario
  // (opcional, dependiendo de tu lógica)

  return (
    <DashboardLayout spacing={false}>
      <div className="p-4 flex justify-between items-center">
        <Breadcrumb items={breadcrumbItems} />
        <Button
          size="sm"
          id="submit-task"
          form="task-form"
          type="submit"
          loading={updateTaskPending}
          disabled={updateTaskPending}
        >
          {updateTaskPending ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      <Formik
        enableReinitialize // 👈 importante: para que los valores iniciales se actualicen si taskDetails cambia
        initialValues={{
          title: taskDetails?.title ?? "",
          content: taskDetails?.description ?? "",
          columnId: taskDetails?.column?.id ?? columns[0]?.value ?? "",
          priority: taskDetails?.priority ?? "",
        }}
        onSubmit={async (values) => {
          const updatedTask: CreateTask = {
            title: values.title,
            description: values.content,
            columnId: values.columnId,
            projectId: selectedProject?.id ?? "",
            priority: values.priority,
          }
          await updateTask({ task: updatedTask, taskId: id ?? "" })
          navigate("/dashboard")
        }}
      >
        {({ values, setFieldValue }) => (
          <Form id="task-form" className="flex flex-col gap-4 p-4">
            {/* Título */}
            <Input
              name="title"
              variant="ghost"
              placeholder="Título de su tarea"
              className="text-3xl font-bold"
              value={values.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
              autoFocus
            />

            <div className="flex gap-2">
              <Dropdown
                size="sm"
                items={columns}
                placeholder="Selecciona un estado"
                className="px-4 flex-1"
                value={values.columnId}
                onSelect={(item) => setFieldValue("columnId", item.value)}
              />
              <Dropdown
                size="sm"
                items={taskPriorityItems}
                placeholder="Selecciona prioridad"
                value={values.priority}
                onSelect={(item) => setFieldValue("priority", item.value)}
              />
              <Button
                className='bg-danger-500 border-0' size='sm' variant='outline'
                onClick={async () => {
                  await deleteTask({ taskId: taskDetails?.id ?? "" })
                  navigate("/dashboard")
                }}>
                Eliminar
              </Button>
            </div>

            {/* Editor de contenido */}
            <SimpleEditor
              content={values.content}
              onUpdate={(html: string) => setFieldValue("content", html)}
            />
          </Form>
        )}
      </Formik>
    </DashboardLayout>
  )
}

export default EditTaskEditorPage