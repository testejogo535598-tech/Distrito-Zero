function Carrinho({
  carrinho,
  aumentarQuantidade,
  diminuirQuantidade
}) {

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  )

  return (
    <section>
      <h2>🛒 Carrinho</h2>

      {carrinho.length === 0 ? (
        <div className="card-produto">
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        carrinho.map((item) => (
          <div className="card-produto" key={item.id}>

            <h3>{item.nome}</h3>

            <p>
              💰 {item.preco} {item.moeda}
            </p>

            <div className="quantidade">

              <button
                className="btn-comprar"
                onClick={() => diminuirQuantidade(item.id)}
              >
                −
              </button>

              <span>
                {item.quantidade}
              </span>

              <button
                className="btn-comprar"
                onClick={() => aumentarQuantidade(item.id)}
              >
                +
              </button>

            </div>

            <p className="preco">
              Subtotal: {item.preco * item.quantidade} {item.moeda}
            </p>

          </div>
        ))
      )}

      <div className="card-produto">
        <h3>Total</h3>

        <p className="preco">
          💰 {total} DZ Coins
        </p>

        <button className="btn-comprar">
          Finalizar Compra
        </button>
      </div>

    </section>
  )
}

export default Carrinho
