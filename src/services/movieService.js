import axiosClient from '../api/axiosClient'

export const getAllMovies = async () => {
  try {
    const response = await axiosClient.get('/movies')
    return response.data
  } catch (err) {
    // Fallback in case backend controller is mapped to /api/movies directly
    if (err.response?.status === 404) {
      try {
        const fallback = await axiosClient.get('/api/movies')
        return fallback.data
      } catch {
        throw err
      }
    }
    throw err
  }
}

export const addMovie = async (movieData) => {
  try {
    const response = await axiosClient.post('/movies', movieData)
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      const fallback = await axiosClient.post('/api/movies', movieData)
      return fallback.data
    }
    throw err
  }
}
