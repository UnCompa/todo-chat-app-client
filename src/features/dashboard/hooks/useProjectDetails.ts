import { useQuery } from "@tanstack/react-query"
import { ProjectService } from "../../../services/projects/projectService"

export const useProjectDetails = ({ userId, projectId }: { userId: string, projectId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['projectDetail', userId, projectId],
    queryFn: async () => {
      const service = new ProjectService()
      const data = await service.getDetails(projectId)
      return data
    },
    enabled: !!userId && !!projectId
  })

  return {
    data, isLoading
  }
}