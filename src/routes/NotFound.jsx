import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Stránka nenalezena</h2>
      <Link to="/dashboard">Zpět na Dashboard</Link>
    </div>
  )
}
