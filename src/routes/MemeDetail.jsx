import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMemeById, getMemes, getRelated } from '../services/memesService.js'
import useCart from '../hooks/useCart.js'
import RatingStars from '../components/RatingStars.jsx'
import MemeCard from '../components/MemeCard.jsx'
import styles from '../styles/MemeGrid.module.css'

export default function MemeDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [meme, setMeme] = useState(null)
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const m = await getMemeById(id)
        const all = await getMemes()
        if (!ignore) { setMeme(m); setMemes(all) }
      } catch (e) {
        if (!ignore) setError(e)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [id])

  if (loading) return <div style={{ padding: 16 }}>Načítání…</div>
  if (error || !meme) return <div style={{ padding: 16, color: 'crimson' }}>Nepodařilo se načíst detail 😢</div>

  const related = getRelated(memes, meme, 3)

  return (
    <div style={{ padding: 16 }}>
      <Link to="/memes">← Zpět na seznam</Link>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:16, marginTop:16 }}>
        <img src={meme.url} alt={meme.name} style={{ width:'100%', maxHeight:500, objectFit:'contain', background:'#f3f4f6' }} />
        <div>
          <h2>{meme.name}</h2>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <RatingStars rating={meme.rating} />
            <span style={{ background:'#eef2ff', color:'#3730a3', padding:'4px 8px', borderRadius:999 }}>{meme.category}</span>
          </div>
          <div style={{ marginTop:8 }}>Rozměry: {meme.width} × {meme.height}</div>
          <button onClick={() => addItem(meme)} style={{ marginTop:12, padding:'8px 12px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }}>Přidat do košíku</button>
        </div>
      </div>

      <h3 style={{ marginTop:24 }}>Related memes</h3>
      <div className={styles.grid}>
        {related.map(m => <MemeCard key={m.id} meme={m} />)}
      </div>
    </div>
  )
}
