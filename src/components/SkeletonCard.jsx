import styles from '../styles/MemeGrid.module.css'

export default function SkeletonCard() {
  return (
    <div className={styles.card} aria-busy>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonText} />
      <div className={styles.skeletonText} style={{ width: '60%' }} />
    </div>
  )
}
