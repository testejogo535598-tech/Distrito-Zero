import { useState } from 'react'
import Header from './components/Header'
import Produtos from './components/Produtos'
import Carrinho from './components/Carrinho'

function App() {
  const [carrinho, setCarrinho] = useState([])

  function adicionarAoCarrinho(produto) {
    setCarrinho([...carrinho, produto])
  }

  function removerDoCarrinho(index) {
    const novoCarrinho = [...carrinho]
    novoCarrinho.splice(index, 1)
    setCarrinho(novoCarrinho)
  }

  return (
    <>
      <Header />

      <Produtos
        adicionarAoCarrinho={adicionarAoCarrinho}
      />

      <Carrinho
        carrinho={carrinho}
        removerDoCarrinho={removerDoCarrinho}
      />
    </>
  )
}

export default App
