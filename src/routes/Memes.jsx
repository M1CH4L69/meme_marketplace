import { useEffect, useMemo, useState } from 'react'
import { getMemes, categories } from '../services/memesService.js'
import MemeCard from '../components/MemeCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import styles from '../styles/MemeGrid.module.css'
import { Link } from 'react-router-dom'

export default function Memes() {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('name')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)
    getMemes()
      .then(m => { if (!ignore) setMemes(m) })
      .catch(err => { if (!ignore) setError(err) })
      .finally(() => { if (!ignore) setLoading(false) })
    return () => { ignore = true }
  }, [])

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setQuery(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const filtered = useMemo(() => {
    let data = [...memes]
    if (query) {
      const q = query.toLowerCase()
      data = data.filter(m => m.name.toLowerCase().includes(q))
    }
    if (category && category !== 'All') {
      data = data.filter(m => m.category === category)
    }
    if (sort === 'name') {
      data.sort((a,b) => a.name.localeCompare(b.name))
    } else if (sort === 'rating') {
      data.sort((a,b) => b.rating - a.rating)
    } else if (sort === 'size') {
      data.sort((a,b) => b.area - a.area)
    }
    return data
  }, [memes, query, category, sort])

  return (
    <div style={{ padding: 16 }}>
      <h2>Seznam memů</h2>
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:16, alignItems:'center' }}>
        <input
          placeholder="Vyhledat podle názvu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding:8, minWidth:220 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">Název A–Z</option>
          <option value="rating">Rating</option>
          <option value="size">Velikost (width×height)</option>
        </select>
        <Link to="/cart" style={{ marginLeft:'auto', padding:'8px 12px', background:'#2563eb', color:'#fff', borderRadius:8 }}>Přejít do košíku</Link>
      </div>

      {loading && (
        <div className={styles.grid}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div style={{ color:'crimson', marginTop: 12 }}>Nepodařilo se načíst memy</div>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {filtered.map(m => <MemeCard key={m.id} meme={m} />)}
        </div>
      )}
    </div>
  )
}
