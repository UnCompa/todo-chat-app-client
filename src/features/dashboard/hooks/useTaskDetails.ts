import { TaskService } from '@/services/tasks/taskService'
import { useQuery } from '@tanstack/react-query'

const service = new TaskService()

export function useTaskDetails(taskId: string) {
  return useQuery({
    queryKey: ['task', taskId], // 👈 aquí pasas el id
    queryFn: async ({ queryKey }) => {
      const [, taskId] = queryKey  // extraes el id
      const data = await service.getTaskById(taskId as string)
      return data.data
    },
  })
}
