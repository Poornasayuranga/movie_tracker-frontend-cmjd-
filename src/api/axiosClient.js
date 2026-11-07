import axios from 'axios'
import { getToken } from '../utils/tokenUtils'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Automatically attach JWT token
axiosClient.interceptors.request.use(
  (config) => {
    const url = config.url || ''

    // NEVER attach Authorization header to public auth requests (login, register)
    const isAuthRoute =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.startsWith('/auth')

    if (isAuthRoute) {
      delete config.headers.Authorization
    } else {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for clear debugging
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default axiosClient
