import { ApiError } from './apiResponse/ApiError'

export type ErrorDisplayState = {
  apiErrors: ApiError[],
  setApiErrors: React.Dispatch<React.SetStateAction<ApiError[]>>,
}
