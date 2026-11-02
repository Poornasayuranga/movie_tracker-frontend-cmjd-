import axiosClient from '../api/axiosClient'

export const getAllMovies = async () => {
  const response = await axiosClient.get('/api/movies')
  return response.data
}

export const addMovie = async (movieData) => {
  const response = await axiosClient.post('/api/movies', movieData)
  return response.data
}
