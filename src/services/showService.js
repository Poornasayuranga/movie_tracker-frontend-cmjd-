import axiosClient from '../api/axiosClient'

// Get all TV shows
export const getAllShows = async () => {
  const response = await axiosClient.get('/api/shows')
  return response.data
}

// Add a new TV show
export const addShow = async (showData) => {
  const response = await axiosClient.post('/api/shows', showData)
  return response.data
}
