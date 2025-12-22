export default function RatingStars({ rating = 0 }) {
  const filled = '★'.repeat(rating)
  const empty = '☆'.repeat(Math.max(0, 5 - rating))
  return <span aria-label={`Rating ${rating}/5`}>{filled}{empty}</span>
}
