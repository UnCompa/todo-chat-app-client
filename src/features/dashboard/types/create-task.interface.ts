export interface CreateTask {
  title: string
  description: string
  status?: string
  priority?: string
  dueDate?: string
  projectId: string
  columnId: string
  assignedTo?: string[]
  labelIds?: string[]
}
