export interface TaskDetails {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: string
  order: number
  createdAt: string
  updatedAt: string
  column: Column
  assignees: Assignee[]
  labels: Label[]
  //comments: any[]
  //attachments: any[]
}

export interface Column {
  id: string
  name: string
}

export interface Assignee {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Label {
  id: string
  name: string
  color: string
}
