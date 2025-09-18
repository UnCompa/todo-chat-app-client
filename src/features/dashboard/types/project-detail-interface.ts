export interface ProjectDetailData {
  statusCode: number
  message: string
  data: ProjectDetail
}

export interface ProjectDetail {
  id: string
  name: string
  description: string
  organizationId: string
  createdAt: string
  updatedAt: string
  columns: Column[]
  members: Member[]
}

export interface Column {
  id: string
  name: string
  order: number
}

export interface Member {
  id: string
  name: string
  email: string
  role: string
}
