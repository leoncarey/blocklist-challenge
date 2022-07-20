import axios, { AxiosInstance } from 'axios'

const apiClient = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.SERVICE_API_URL,
  })

  return api
}

export default apiClient()
