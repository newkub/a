export interface Model {
  id: string
  name: string
}

export interface Provider {
  id: string
  name: string
  avatar: string
  models: Model[]
}