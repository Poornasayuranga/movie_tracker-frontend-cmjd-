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
  console.log('[showService] Sending POST /shows payload:', showData)
  try {
    const response = await axiosClient.post('/shows', showData)
    console.log('[showService] Show created successfully:', response.data)
    return response.data
  } catch (err) {
    console.error('[showService] POST /shows error:', err.response?.data || err.message)
    if (err.response?.status === 404) {
      console.log('[showService] 404 received, attempting fallback to /api/shows...')
      const fallback = await axiosClient.post('/api/shows', showData)
      return fallback.data
    }
    throw err
  }
}
