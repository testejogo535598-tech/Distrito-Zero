function Carrinho({ carrinho, removerDoCarrinho }) {
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0)

  return (
    <section>
      <h2>🛒 Carrinho</h2>

      {carrinho.length === 0 ? (
        <div className="card-produto">
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        carrinho.map((item, index) => (
          <div className="card-produto" key={index}>
            <h3>{item.nome}</h3>

            <p>{item.preco} {item.moeda}</p>

            <button
              className="btn-comprar"
              onClick={() => removerDoCarrinho(index)}
            >
              Remover
            </button>
          </div>
        ))
      )}

      <div className="card-produto">
        <h3>Total</h3>
        <p>💰 {total} DZ Coins</p>

        <button className="btn-comprar">
          Finalizar Compra
        </button>
      </div>
    </section>
  )
}

export default Carrinho
