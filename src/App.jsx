import { useState } from 'react'
import Header from './components/Header'
import Produtos from './components/Produtos'
import Carrinho from './components/Carrinho'

function App() {
  const [carrinho, setCarrinho] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => {
      const existe = atual.find((item) => item.id === produto.id)

      if (existe) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...atual, { ...produto, quantidade: 1 }]
    })
  }

  function aumentarQuantidade(id) {
    setCarrinho((atual) =>
      atual.map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    )
  }

  function diminuirQuantidade(id) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    )
  }

  return (
    <>
      <Header />

      <div style={{ padding: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Pesquisar produto..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '10px',
            border: '2px solid #2ecc71',
            background: '#222',
            color: '#fff',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto'
          }}
        >
          {['Todos', 'Armas', 'Veículos', 'Compra', 'Serviços'].map((cat) => (
            <button
              key={cat}
              className="btn-comprar"
              onClick={() => setCategoria(cat)}
              style={{
                opacity: categoria === cat ? 1 : 0.6,
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Produtos
        pesquisa={pesquisa}
        categoria={categoria}
        adicionarAoCarrinho={adicionarAoCarrinho}
      />

      <Carrinho
        carrinho={carrinho}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
      />
    </>
  )
}

export default App
