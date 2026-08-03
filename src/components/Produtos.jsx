import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Produtos({ pesquisa, categoria, adicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    if (error) {
      console.error(error);
      return;
    }

    setProdutos(data || []);
  }

  useEffect(() => {
    carregarProdutos();

    const canal = supabase
      .channel("produtos-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "produtos",
        },
        () => {
          carregarProdutos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  const produtosFiltrados = produtos.filter((item) => {
    const nome = (item.nome || "").toLowerCase();
    const pesquisaOk = nome.includes(pesquisa.toLowerCase());

    const categoriaOk =
      categoria === "Todos" || item.categoria === categoria;

    const visivel = item.visivel !== false;

    const disponivel =
      item.estoque_infinito === true || (item.estoque ?? 0) > 0;

    return pesquisaOk && categoriaOk && visivel && disponivel;
  });

  return (
    <section>
      <h2>🛒 Catálogo</h2>

      <div className="grid-produtos">
        {produtosFiltrados.map((item) => (
          <div className="card-produto" key={item.id}>
            <img
              src={
                item.imagem ||
                `/imagens/${(item.nome || "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.png`
              }
              alt={item.nome || "Produto"}
              className="imagem-produto"
            />

            <span className="categoria-badge">
              {item.categoria}
            </span>

            <h3>{item.nome}</h3>

            <p className="descricao-produto">
              {item.descricao || item.descrição || ""}
            </p>

            <p className="preco">
              💰 {item.preco} {item.moeda}
            </p>

            {!item.estoque_infinito && (
              <p
                className={`estoque ${
                  (item.estoque ?? 0) > 5
                    ? "estoque-verde"
                    : (item.estoque ?? 0) > 0
                    ? "estoque-amarelo"
                    : "estoque-vermelho"
                }`}
              >
                {(item.estoque ?? 0) > 5
                  ? "🟢 Em estoque"
                  : (item.estoque ?? 0) > 0
                  ? `🟡 Últimas unidades (${item.estoque ?? 0})`
                  : "🔴 Esgotado"}
              </p>
            )}

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
