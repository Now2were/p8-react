import { useState } from 'react'

const products = [
  { id: 'headphones', name: 'Беспроводные наушники', price: 5490, photo: '1585298723682-7115561c51b7' },
  { id: 'keyboard', name: 'Механическая клавиатура', price: 6490, photo: '1724308509041-1ce0103bf5e1' },
  { id: 'camera', name: 'Беззеркальная камера', price: 42990, photo: '1701382334837-d3a98fff1770' },
  { id: 'watch', name: 'Умные часы', price: 11990, photo: '1624096104992-9b4fa3a279dd' },
  { id: 'speaker', name: 'Портативная колонка', price: 3990, photo: '1589003077984-894e133dabab' },
]

const formatPrice = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

function ProductCard({ name, price, image, quantity, onAdd }) {
  return (
    <article className="product-card">
      <img className="product-photo" src={image} alt={name} />
      <div className="product-details">
        <h2>{name}</h2>
        <p className="product-price">{formatPrice.format(price)}</p>
        <output className="product-quantity" aria-label={`Количество: ${name}`}>{quantity}</output>
        <button type="button" aria-label="Добавить в корзину" onClick={onAdd}>
          +
        </button>
      </div>
    </article>
  )
}

function App() {
  const [quantities, setQuantities] = useState({})

  function addProduct(id) {
    setQuantities((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }))
  }

  return (
    <main className="catalog" lang="ru">
      <style>{catalogStyles}</style>
      <h1>Каталог товаров</h1>
      <div className="product-grid">
        {products.map(({ id, name, price, photo }) => (
          <ProductCard
            key={id}
            name={name}
            price={price}
            image={`https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=680&h=420&q=80`}
            quantity={quantities[id] ?? 0}
            onAdd={() => addProduct(id)}
          />
        ))}
      </div>
    </main>
  )
}

const catalogStyles = `
  body {
    background: #eaf5ff;
  }

  #root {
    width: 100%;
    border: 0;
    text-align: left;
  }

  .catalog {
    box-sizing: border-box;
    width: min(100%, 1140px);
    margin-inline: auto;
    padding: clamp(24px, 5vw, 56px) clamp(16px, 4vw, 40px);
    color-scheme: light;
    color: #000;
  }

  .catalog h1 {
    margin: 0 0 22px;
    color: inherit;
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 750;
    line-height: 1.12;
    letter-spacing: -0.03em;
    text-align: center;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    justify-items: center;
    gap: 20px;
  }

  .product-card {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    width: min(100%, 340px);
    aspect-ratio: 1;
    overflow: hidden;
    border: 1px solid #000;
    border-radius: 50%;
    background: #fff;
    text-align: center;
  }

  .product-photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #d5ebff;
  }

  .product-details {
    display: grid;
    justify-items: center;
    align-content: end;
    gap: 3px;
    width: 88%;
    margin-inline: auto;
    padding-block: 8px 11%;
  }

  .product-details h2 {
    display: grid;
    align-content: end;
    min-height: 2lh;
    margin: 0;
    color: inherit;
    font-size: 17px;
    font-weight: 650;
    line-height: 1.15;
  }

  .product-price {
    font-size: 22px;
    font-weight: 750;
  }

  .product-quantity {
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }

  .product-card button {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid currentColor;
    border-radius: 0;
    background: #8ac3ff;
    cursor: pointer;
  }
`

export default App
