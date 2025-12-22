import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'
import useCart from '../hooks/useCart.js'
import styles from '../styles/MemeGrid.module.css'

export default function MemeCard({ meme }) {
  const { addItem } = useCart()
  return (
    <div className={styles.card}>
      <img src={meme.url} alt={meme.name} className={styles.image} />
      <div className={styles.content}>
        <h4 className={styles.title}>{meme.name}</h4>
        <div className={styles.meta}>
          <span className={styles.badge}>{meme.category}</span>
          <RatingStars rating={meme.rating} />
        </div>
        <div className={styles.actions}>
          <Link to={`/memes/${meme.id}`} className={styles.button}>Detail</Link>
          <button onClick={() => addItem(meme)} className={styles.buttonPrimary}>Přidat do košíku</button>
        </div>
      </div>
    </div>
  )
}
