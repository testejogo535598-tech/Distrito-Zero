import produtos from "../data/produtos";

function Produtos({ pesquisa, categoria, adicionarAoCarrinho }) {
  const produtosFiltrados = produtos.filter((item) => {
    const pesquisaOk = item.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    const categoriaOk =
      categoria === "Todos" || item.categoria === categoria;

    return pesquisaOk && categoriaOk;
  });

  return (
    <section>
      <h2>🛒 Catálogo</h2>

      <div className="grid-produtos">
        {produtosFiltrados.map((item) => (
          <div className="card-produto" key={item.id}>

            <img
              src={item.imagem}
              alt={item.nome}
              className="imagem-produto"
            />

            <span className="categoria-badge">
              {item.categoria}
            </span>

            <h3>{item.nome}</h3>

            <p className="preco">
              💰 {item.preco} {item.moeda}
            </p>

            <button
              className="btn-comprar"
              onClick={() => adicionarAoCarrinho(item)}
            >
              🛒 Comprar Agora
            </button>

          </div>
        ))}

        {produtosFiltrados.length === 0 && (
          <div className="card-produto">
            <h3>Nenhum produto encontrado.</h3>
          </div>
        )}
      </div>
    </section>
  );
}

export default Produtos;
