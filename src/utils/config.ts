import { Config } from '../types/Config'

export function getConfig(): Config {
  if (!process.env.REACT_APP_API_ENDPOINT) {
    throw new Error('REACT_APP_API_ENDPOINT is undefined')
  }
  return {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  }
}
