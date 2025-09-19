export interface TaskData {
  statusCode: number
  message: string
  data: Task[]
  pagination: Pagination
}

export interface Task {
  id: string
  title: string
  description: string
  status: string
  order: number
  projectId: string
  columnId: string
  dueDate: string
  priority: string
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  labels: Label[]
  assignees: Assignee[]
}

export interface Label {
  taskId: string
  labelId: string
  isDeleted: boolean
  label: Label2
}

export interface Label2 {
  id: string
  name: string
  color: string
  projectId: string
  organizationId: string | null
  isDeleted: boolean
}

export interface Assignee {
  id: string
  taskId: string
  userId: string
  isDeleted: boolean
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}
