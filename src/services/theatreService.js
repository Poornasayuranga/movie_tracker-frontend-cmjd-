```javascript
import axiosClient from '../api/axiosClient'

// Get all theatre events
export const getAllTheatres = async () => {

  const response = await axiosClient.get('/api/theatres')

  return response.data

}
```