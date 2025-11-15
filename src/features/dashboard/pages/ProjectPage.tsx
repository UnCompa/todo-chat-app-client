import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { useAuthStore } from '@/store/auth/authStore'
import type { Project } from '@/store/dashboard/projectStore'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import DashboardLayout from '../components/DashboardLayout'
import CreateProjectModal from '../components/projects/CreateProjectModal'
import { useDisclosure } from '../hooks/useDisclore'
import { useProject } from '../hooks/useProject'

function ProjectPage() {
  const user = useAuthStore(state => state.user)
  const { projects, deleteProject, undoProject, isDeleteProjectError } = useProject(user?.id ?? "")
  console.info(projects?.data)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const handleDelete = async (projectId: string) => {
    await deleteProject({ projectId })
    if (!isDeleteProjectError) {
      toast.success("Proyecto borrado", {
        action: <Button  size='sm' variant='outline' className='text-surface' onClick={() => undoProject({ projectId })}>Deshacer</Button>,
        duration: 5000,
      })
    }
  }
  return (
    <DashboardLayout>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
      <div className='flex justify-between items-center'>
        <h2 className='font-black text-2xl text-text py-4'>Tus proyectos</h2>
        <Button size='sm' onClick={onOpen}>
          Añadir
        </Button>
      </div>
      <section className='flex flex-col gap-2'>
        {
          projects?.data.map((project: Project) => (
            <Card className='flex items-center justify-between'>
              <div>
                <h3>{project.name}</h3>
                <p className='text-shadow-placeholder'>{project.description}</p>
              </div>
              <button className='cursor-pointer' onClick={() => handleDelete(project.id)}>
                {/* <Pencil size={20} color='red'></Pencil> */}
                <Trash size={20} color='red'></Trash>
              </button>
            </Card>
          ))
        }
      </section>
    </DashboardLayout>
  )
}

export default ProjectPage