import type { CreateTask } from "@/features/dashboard/types/create-task.interface";
import type { TaskDetails } from "@/features/dashboard/types/task-details.interface";
import type { Task } from "@/features/dashboard/types/task.interface";
import type { ApiResponse } from "@/types/api-response.interface";
import { ApiClient } from "../api/api-client";

export class TaskService extends ApiClient {

  constructor() {
    super()
  }

  getTasks(projectId: string): Promise<{data: Task[]}> {
    try {
      const res = this.getData<{ data: Task[] }>(`/api/tasks/project/${projectId}`)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async getTaskById(taskId: string): Promise<ApiResponse & { data: TaskDetails }> {
    try {
      const res = await this.getData<ApiResponse & { data: TaskDetails }>(`/api/tasks/${taskId}`)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async deleteTaskById(taskId: string): Promise<ApiResponse & { data: null }> {
    try {
      const res = await this.deleteData<ApiResponse & { data: null }>(`/api/tasks/${taskId}`)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  moveTasks(tasksId: string, columnId: string, projectId: string) {
    try {
      const res = this.patchData(`/api/tasks/${tasksId}/move/${projectId}`, { columnId })
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  createTask(task: CreateTask) {
    try {
      const res = this.postData(`/api/tasks`, task)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  updateTask(id: string, task: CreateTask) {
    try {
      const res = this.putData(`/api/tasks/${id}`, task)
      console.info(res)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}