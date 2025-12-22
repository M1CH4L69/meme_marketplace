import { Navigate, Outlet } from 'react-router-dom'

function getUser() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function PrivateRoute() {
  const user = getUser()
  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
