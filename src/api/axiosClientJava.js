import axios from 'axios'

// Java API
const axiosClientJava = axios.create({
  baseURL: process.env.REACT_APP_JAVA_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClientJava.interceptors.request.use(async (config) => {
  // const token = localStorage.getItem(AUTH_TOKEN_KEY)
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  // return config
})

axiosClientJava.interceptors.response.use((response) => {
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

export default axiosClientJava
