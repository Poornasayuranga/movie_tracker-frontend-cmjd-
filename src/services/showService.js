```javascript
import axiosClient from '../api/axiosClient'

// Get all TV shows
export const getAllShows = async () => {

  const response = await axiosClient.get('/api/shows')

  return response.data

}
```