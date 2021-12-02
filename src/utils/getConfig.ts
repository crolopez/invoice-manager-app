import { Config } from '../types/Config'
import { AppConfig } from '../appConfig'

export function getConfig(): Config {
  if (!AppConfig.REACT_APP_API_ENDPOINT) {
    throw new Error('REACT_APP_API_ENDPOINT is undefined')
  }
  return {
    API_ENDPOINT: AppConfig.REACT_APP_API_ENDPOINT,
  }
}
