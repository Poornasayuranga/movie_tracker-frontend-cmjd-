import axiosClient from '../api/axiosClient'

export const getAllTheatres = async () => {
  try {
    const response = await axiosClient.get('/theatres')
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      try {
        const fallback = await axiosClient.get('/api/theatres')
        return fallback.data
      } catch {
        throw err
      }
    }
    throw err
  }
}

export const addTheatre = async (theatreData) => {
  try {
    const response = await axiosClient.post('/theatres', theatreData)
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      const fallback = await axiosClient.post('/api/theatres', theatreData)
      return fallback.data
    }
    throw err
  }
}
