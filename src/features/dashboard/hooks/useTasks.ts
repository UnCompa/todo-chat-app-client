import { useMutation, useQuery } from "@tanstack/react-query"
import { TaskService } from "../../../services/tasks/taskService"

export const useTasks = ({ projectId }: { projectId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const service = new TaskService()
      const data = await service.getTasks(projectId)
      return data.data
    }
  })

  const { mutate: updateTaskColumn } = useMutation({
    mutationFn: async ({ taskId, columnId, projectId }: { taskId: string, columnId: string, projectId: string }) => {
      const service = new TaskService()
      const data = await service.moveTasks(taskId, columnId, projectId)
      return data
    }
  })
  return { data, isLoading, updateTaskColumn }
}