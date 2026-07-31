import produtos from '../data/produtos'

function Produtos() {
  return (
    <section>
      <h2>Catálogo</h2>

      {produtos.map((item) => (
        <div key={item.id}>
          <h3>{item.nome}</h3>
          <p>Categoria: {item.categoria}</p>
          <p>Preço: {item.preco} {item.moeda}</p>
        </div>
      ))}
    </section>
  )
}

export default Produtos
