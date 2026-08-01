function Carrinho() {
  return (
    <section>
      <h2>🛒 Carrinho</h2>

      <div className="card-produto">
        <p>Seu carrinho está vazio.</p>
        <p>Total: <strong>0 DZ Coins</strong></p>

        <button className="btn-comprar">
          Finalizar Compra
        </button>
      </div>
    </section>
  )
}

export default Carrinho
