import produtos from '../data/produtos'

function Produtos({ adicionarAoCarrinho }) {
  return (
    <section>
      <h2>📦 Catálogo</h2>

      <div className="grid-produtos">
        {produtos.map((item) => (
          <div className="card-produto" key={item.id}>
            <div className="imagem-produto">
              📦
            </div>

            <h3>{item.nome}</h3>

            <p>
              Categoria: {item.categoria}
            </p>

            <p className="preco">
              💰 {item.preco} {item.moeda}
            </p>

            <button
              className="btn-comprar"
              onClick={() => adicionarAoCarrinho(item)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Produtos
