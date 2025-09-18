import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectService } from '../../../services/projects/projectService'

export const useProject = (userId: string) => {
  const queryClient = useQueryClient()

  // Query para obtener proyectos
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: ['projects', userId],
    queryFn: async () => {
      const service = new ProjectService()
      return await service.getAll()
    },
    enabled: !!userId, // evita ejecutar si no hay userId
  })

  // Mutation para crear proyectos
  const {
    mutate: createProject,
    isPending: isCreatingProject,
    isError: isCreateProjectError,
  } = useMutation({
    mutationFn: async ({ name, description }: { name: string; description: string }) => {
      const service = new ProjectService()
      return await service.create(name, description)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', userId] })
    },
  })

  return {
    // Query
    projects,
    isProjectsLoading,
    isProjectsError,
    refetchProjects,

    // Mutation
    createProject,
    isCreatingProject,
    isCreateProjectError,
  }
}
