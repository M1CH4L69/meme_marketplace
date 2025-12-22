import useCart from '../hooks/useCart.js'

export default function Cart() {
  const { items, addItem, decreaseCount, removeItem, clearCart, getTotalPrice } = useCart()
  return (
    <div style={{ padding: 16 }}>
      <h2>Košík</h2>
      {items.length === 0 && <div>Košík je prázdný</div>}
      {items.length > 0 && (
        <div>
          <ul style={{ listStyle:'none', padding:0, margin:0 }}>
            {items.map(i => (
              <li key={i.id} style={{ display:'grid', gridTemplateColumns:'80px 1fr auto', gap:12, alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 0' }}>
                <img src={i.url} alt={i.name} style={{ width:80, height:80, objectFit:'cover', borderRadius:8 }} />
                <div>
                  <div style={{ fontWeight:600 }}>{i.name}</div>
                  <div>Rating: {i.rating}</div>
                  <div>Cena: {i.price} Kč</div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <button onClick={() => decreaseCount(i.id)}>-</button>
                  <span>{i.count}</span>
                  <button onClick={() => addItem({ id: i.id, name: i.name, url: i.url, rating: i.rating })}>+</button>
                  <button onClick={() => removeItem(i.id)} style={{ marginLeft: 8 }}>Odebrat</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16, fontSize: 18 }}>Celkem: <strong>{getTotalPrice()} Kč</strong></div>
          <button onClick={clearCart} style={{ marginTop: 12, padding:'8px 12px' }}>Vyčistit košík</button>
        </div>
      )}
    </div>
  )
}
