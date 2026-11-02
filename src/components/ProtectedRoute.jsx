
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from '../utils/tokenUtils'

export default function ProtectedRoute() {
  const location = useLocation()
  const token = getToken()

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}
