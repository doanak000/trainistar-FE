import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(async (config) => {
  // const Authorization = getAuthorization()
  // if (Authorization) {
  //   config.headers.Authorization = Authorization
  // }
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
