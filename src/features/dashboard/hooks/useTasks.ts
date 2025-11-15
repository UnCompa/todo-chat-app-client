import { useMutation, useQuery } from "@tanstack/react-query"
import { TaskService } from "../../../services/tasks/taskService"
import type { CreateTask } from "../types/create-task.interface"

export const useTasks = ({ projectId }: { projectId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const service = new TaskService()
      const data = await service.getTasks(projectId)
      return data.data
    }
  })
  const { mutateAsync: updateTaskColumn } = useMutation({
    mutationFn: async ({ taskId, columnId, projectId }: { taskId: string, columnId: string, projectId: string }) => {
      const service = new TaskService()
      const data = await service.moveTasks(taskId, columnId, projectId)
      return data
    }
  })
  const { mutate: createTask } = useMutation({
    mutationFn: async ({ task }: { task: CreateTask }) => {
      const service = new TaskService()
      const data = await service.createTask(task)
      return data
    }
  })
  const { mutateAsync: updateTask, isPending: updateTaskPending, isSuccess: updateTaskSuccess, error: updateTaskError } = useMutation({
    mutationFn: async ({ taskId, task }: { taskId: string, task: CreateTask }) => {
      const service = new TaskService()
      const data = await service.updateTask(taskId, task)
      return data
    }
  })
  const { mutate: deleteTask, isPending: deleteTaskPending, isSuccess: deleteTaskSuccess, error: deleteTaskError } = useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const service = new TaskService()
      const data = await service.deleteTaskById(taskId)
      return data
    }
  })
  return {
    data,
    isLoading,
    updateTaskColumn,
    createTask,
    updateTask,
    updateTaskPending,
    updateTaskSuccess,
    updateTaskError,
    deleteTask,
    deleteTaskPending,
    deleteTaskSuccess,
    deleteTaskError
  }
}