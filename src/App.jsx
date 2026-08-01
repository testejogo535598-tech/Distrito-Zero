import { useState } from 'react'
import Header from './components/Header'
import Produtos from './components/Produtos'
import Carrinho from './components/Carrinho'

function App() {
  const [carrinho, setCarrinho] = useState([])

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

      <Produtos adicionarAoCarrinho={adicionarAoCarrinho} />

      <Carrinho
        carrinho={carrinho}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
      />
    </>
  )
}

export default App
