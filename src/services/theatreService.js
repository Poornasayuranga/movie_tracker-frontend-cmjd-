import axiosClient from '../api/axiosClient'

// Get all theatre events
export const getAllTheatres = async () => {
  const response = await axiosClient.get('/api/theatres')
  return response.data
}

// Add a new theatre
export const addTheatre = async (theatreData) => {
  const response = await axiosClient.post('/api/theatres', theatreData)
  return response.data
}
