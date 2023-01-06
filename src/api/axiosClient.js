import axios from 'axios'
import { AUTH_TOKEN_KEY } from '../constants/common'

// ASP.NET API
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use((response) => {
  return {
    success: true,
    data: response?.data ?? response
  }
}, (error) => {
  return {
    success: false,
    data: error?.response?.data ?? error
  }
})

export default axiosClient
