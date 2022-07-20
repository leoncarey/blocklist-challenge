import axios, { AxiosInstance } from 'axios'
import config from './config'

const apiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: config.SERVICE_API_URL,
  })

  return api
}

export default apiClient()
