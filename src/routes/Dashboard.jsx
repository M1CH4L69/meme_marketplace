import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMemes } from '../services/memesService.js'
import useCart from '../hooks/useCart.js'
import RatingStars from '../components/RatingStars.jsx'

export default function Dashboard() {
  const { items } = useCart()
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)
    getMemes()
      .then(m => { if (!ignore) setMemes(m) })
      .catch(e => { if (!ignore) setError(e) })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [])

  const categoryCount = useMemo(() => {
    const set = new Set(memes.map(m => m.category))
    return set.size
  }, [memes])

  const topMeme = useMemo(() => {
    return memes.slice().sort((a,b) => b.rating - a.rating)[0] || null
  }, [memes])

  return (
    <div style={{ padding: 16 }}>
      <h2>Meme Admin Panel</h2>
      {loading && <div>Načítání…</div>}
      {error && <div style={{ color:'crimson' }}>Nepodařilo se načíst data 😢</div>}
      {!loading && !error && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:16 }}>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <div>Počet meme obrázků</div>
            <strong>{memes.length}</strong>
          </div>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <div>Počet kategorií</div>
            <strong>{categoryCount}</strong>
          </div>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <div>Položek v košíku</div>
            <strong>{items.reduce((s,i)=>s+i.count,0)}</strong>
          </div>
          <div style={{ border:'1px solid #e5e7eb', borderRadius:12, padding:16 }}>
            <div>Nejoblíbenější meme</div>
            {topMeme ? (
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <img src={topMeme.url} alt={topMeme.name} style={{ width:64, height:64, objectFit:'cover', borderRadius:8 }} />
                <div>
                  <div>{topMeme.name}</div>
                  <RatingStars rating={topMeme.rating} />
                </div>
              </div>
            ) : (
              <div>—</div>
            )}
          </div>
        </div>
      )}
      <div style={{ marginTop:24 }}>
        <Link to="/memes" style={{ padding:'8px 12px', background:'#2563eb', color:'#fff', borderRadius:8, textDecoration:'none' }}>Přejít na memy</Link>
      </div>
    </div>
  )
}
