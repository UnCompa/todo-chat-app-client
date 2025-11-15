import { Breadcrumb } from '@/components/common/Breadcrum'
import Button from '@/components/common/Button'
import { Dropdown } from '@/components/common/Dropdown'
import Input from '@/components/common/Input'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { useAuthStore } from '@/store/auth/authStore'
import { useProjectStore } from '@/store/dashboard/projectStore'
import { Form, Formik } from 'formik'
import { AlertCircle, ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useProjectDetails } from '../hooks/useProjectDetails'
import { useTasks } from '../hooks/useTasks'
import type { CreateTask } from '../types/create-task.interface'
import { useNavigate } from 'react-router-dom'

function TaskEditorPage() {
  const { selectedProject } = useProjectStore(state => state)
  const user = useAuthStore(state => state.user)
  const { data } = useProjectDetails({ userId: user?.id ?? "", projectId: selectedProject?.id ?? "" })
  const { createTask } = useTasks({ projectId: selectedProject?.id ?? "" })
  const navigate = useNavigate()
  const breadcrumbItems = [
    { label: selectedProject?.name ?? "", href: "/dashboard" },
    { label: "Crear tarea" },
  ]

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key == "Enter" && e.altKey) {
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
  ];

  const columns = data?.data.columns.map((col) => ({
    label: col.name,
    value: col.id
  }))

  return (
    <DashboardLayout spacing={false}>
      <div className="p-4 flex justify-between">
        <Breadcrumb items={breadcrumbItems} />
        <Button size="sm" id="submit-task" form="task-form" type="submit">
          Crear
        </Button>
      </div>

      <Formik
        initialValues={{
          title: "",
          content: "",
          columnId: columns![0].value,
          priority: null,
        }}
        onSubmit={async (values) => {
          console.info("FORM VALUES", values)
          const newTask: CreateTask = {
            title: values.title,
            description: values.content,
            columnId: values.columnId ?? "",
            projectId: selectedProject?.id ?? "",
            priority: values.priority ?? ""
          }
          await createTask({ task: newTask });
          navigate("/dashboard")
        }}
      >
        {({ values, setFieldValue }) => (
          <Form id="task-form" className="flex flex-col gap-4">
            {/* Título */}
            <Input
              name="title"
              variant="ghost"
              placeholder="Titulo de su tarea"
              className="text-3xl font-bold"
              value={values.title}
              onChange={(e) => setFieldValue("title", e.target.value)}
              autoFocus
            />
            <div className='flex'>
              <Dropdown
                size='sm'
                items={columns ?? []}
                placeholder="Selecciona un estado"
                className='px-4'
                value={values.columnId ?? columns![0].value}
                onSelect={(item) => setFieldValue("columnId", item.value)}
              />
              <Dropdown
                size='sm'
                items={taskPriorityItems}
                placeholder="Selecciona prioridad"
                onSelect={(item) => setFieldValue("priority", item.value)}
              />

            </div>
            {/* Editor de contenido */}
            <SimpleEditor
              content={values.content} // 👈 importante: contenido inicial
              onUpdate={(html: string) => setFieldValue("content", html)} // sincroniza con formik
            />
          </Form>
        )}
      </Formik>
    </DashboardLayout>
  )
}

export default TaskEditorPage
