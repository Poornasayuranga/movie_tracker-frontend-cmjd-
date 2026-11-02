
import axiosClient from '../api/axiosClient'
import { saveToken, removeToken } from '../utils/tokenUtils'

// Register user
export const registerUser = async (userDetails) => {
  const response = await axiosClient.post(
    '/auth/register',
    userDetails
  )

  return response.data
}

// Login user
export const loginUser = async (loginDetails) => {
  const response = await axiosClient.post(
    '/auth/login',
    loginDetails
  )

  const token = response.data

  if (!token || token === 'invalid Credential') {
    throw new Error('Invalid username or password.')
  }

  // Save JWT token
  saveToken(token)

  return token
}

// Logout user
export const logoutUser = () => {
  removeToken()
}
