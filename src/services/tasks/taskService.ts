import { ApiClient } from "../api/api-client";

export class TaskService extends ApiClient {

  constructor() {
    super()
  }

  getTasks(projectId: string) {
    try {
      const res = this.getData(`/api/tasks/project/${projectId}`)
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
}