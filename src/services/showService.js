import axiosClient from '../api/axiosClient'

export const getAllShows = async () => {
  try {
    const response = await axiosClient.get('/shows')
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      try {
        const fallback = await axiosClient.get('/api/shows')
        return fallback.data
      } catch {
        throw err
      }
    }
    throw err
  }
}

export const addShow = async (showData) => {
  try {
    const response = await axiosClient.post('/shows', showData)
    return response.data
  } catch (err) {
    if (err.response?.status === 404) {
      const fallback = await axiosClient.post('/api/shows', showData)
      return fallback.data
    }
    throw err
  }
}
