import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!username || username.trim().length < 3) e.username = 'Min. 3 znaky'
    if (!password || password.trim().length < 5) e.password = 'Min. 5 znaků'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const user = { username: username.trim(), loggedIn: true }
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/dashboard', { replace: true })
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Přihlášení</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Uživatelské jméno</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.username && (
            <div style={{ color: 'crimson' }}>{errors.username}</div>
          )}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Heslo</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            style={{ width: '100%', padding: 8 }}
          />
          {errors.password && (
            <div style={{ color: 'crimson' }}>{errors.password}</div>
          )}
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Přihlásit</button>
      </form>
    </div>
  )
}
