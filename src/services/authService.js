import axiosClient from '../api/axiosClient'
import { saveToken, removeToken } from '../utils/tokenUtils'

// Register user
export const registerUser = async (userDetails) => {
  const response = await axiosClient.post('/auth/register', userDetails)
  return response.data
}

// Login user
export const loginUser = async (loginDetails) => {
  // Clear any existing stale or expired tokens before requesting a new one
  removeToken()

  const response = await axiosClient.post('/auth/login', loginDetails)
  const data = response.data

  if (!data) {
    throw new Error('No response received from authentication server.')
  }

  // Handle plain text error responses from backend
  if (
    typeof data === 'string' &&
    (data.toLowerCase().includes('invalid') || data.toLowerCase().includes('bad credential'))
  ) {
    throw new Error('Invalid username or password.')
  }

  // Save JWT token
  saveToken(data)

  // Save user profile state for the navbar and app header
  const userPayload = {
    username: loginDetails.username,
    name: loginDetails.username,
    role: 'CUSTOMER'
  }
  localStorage.setItem('movieTracker_user', JSON.stringify(userPayload))
  window.dispatchEvent(new Event('storage'))

  return data
}

// Logout user
export const logoutUser = () => {
  removeToken()
  localStorage.removeItem('movieTracker_user')
  window.dispatchEvent(new Event('storage'))
}
