const CATEGORIES = ["animals", "celebrities", "gaming", "school", "random"]

function enrich(meme) {
  const rating = Math.max(1, Math.ceil(Math.random() * 5))
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
  const area = meme.width * meme.height
  return { ...meme, rating, category, area }
}

export async function getMemes() {
  const res = await fetch('https://api.imgflip.com/get_memes')
  if (!res.ok) throw new Error('Network error')
  const json = await res.json()
  if (!json?.success) throw new Error('API failed')
  const memes = json.data?.memes || []
  return memes.map(enrich)
}

export async function getMemeById(id) {
  const memes = await getMemes()
  return memes.find((m) => String(m.id) === String(id)) || null
}

export function getRelated(memes, current, count = 3) {
  const same = memes.filter(m => m.category === current.category && m.id !== current.id)
  return same.slice(0, count)
}

export const categories = CATEGORIES
