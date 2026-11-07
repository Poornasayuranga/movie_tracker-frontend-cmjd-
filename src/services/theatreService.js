import axiosClient from '../api/axiosClient'

export const getAllTheatres = async () => {
  try {
    const response = await axiosClient.get('/theatre')
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      try {
        const fallback = await axiosClient.get('/theatres')
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
    const response = await axiosClient.post('/theatre', theatreData)
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      const fallback = await axiosClient.post('/theatres', theatreData)
      return fallback.data
    }
    throw err
  }
}
