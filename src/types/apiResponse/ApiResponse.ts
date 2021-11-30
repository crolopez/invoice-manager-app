import { ApiDataNode } from './ApiDataNode'
import { ApiError } from './ApiError'

export interface ApiResponse {
  data: ApiDataNode[],
  errors: ApiError[]
}
