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
    <section style={sectionStyle}>
      <div style={topoStyle}>
        <div>
          <h2 style={tituloStyle}>🛒 Catálogo</h2>
          <p style={subtituloStyle}>
            Produtos disponíveis em tempo real
          </p>
        </div>

        <div style={contadorStyle}>
          {produtosFiltrados.length} item{produtosFiltrados.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={gridStyle}>
        {produtosFiltrados.map((item) => {
          const estoqueAtual = Number(item.estoque ?? 0);
          const imagemFinal =
            item.imagem ||
            `/imagens/${(item.nome || "")
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\//g, "-")}.png`;

          const statusEstoque = item.estoque_infinito
            ? "♾️ Infinito"
            : estoqueAtual > 5
            ? "🟢 Em estoque"
            : estoqueAtual > 0
            ? `🟡 Últimas unidades (${estoqueAtual})`
            : "🔴 Esgotado";

          const statusEstoqueStyle = item.estoque_infinito
            ? stockBadgeStyle
            : estoqueAtual > 5
            ? { ...stockBadgeStyle, background: "#14532d", color: "#d9fbe5" }
            : estoqueAtual > 0
            ? { ...stockBadgeStyle, background: "#854d0e", color: "#fff7cc" }
            : { ...stockBadgeStyle, background: "#7f1d1d", color: "#ffe5e5" };

          return (
            <article key={item.id} style={cardStyle}>
              <div style={imagemWrapStyle}>
                <img
                  src={imagemFinal}
                  alt={item.nome || "Produto"}
                  className="imagem-produto"
                  style={imagemStyle}
                  loading="lazy"
                />
              </div>

              <div style={cardBodyStyle}>
                <div style={cabecalhoCardStyle}>
                  <span style={categoriaBadgeStyle}>{item.categoria}</span>
                  <span style={statusEstoqueStyle}>{statusEstoque}</span>
                </div>

                <h3 style={nomeStyle}>{item.nome}</h3>

                <p style={descricaoStyle}>
                  {item.descricao || item.descrição || "Sem descrição."}
                </p>

                <div style={rodapeCardStyle}>
                  <div style={precoBoxStyle}>
                    <span style={labelPrecoStyle}>Preço</span>
                    <strong style={precoStyle}>
                      {item.preco} {item.moeda}
                    </strong>
                  </div>

                  <button
                    className="btn-comprar"
                    onClick={() => adicionarAoCarrinho(item)}
                    style={botaoComprarStyle}
                  >
                    🛒 Comprar Agora
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {produtosFiltrados.length === 0 && (
          <div style={emptyStateStyle}>
            <h3>Nenhum produto encontrado.</h3>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Tente outra busca ou selecione outra categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "10px 20px 30px",
};

const topoStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "18px",
};

const tituloStyle = {
  margin: 0,
  fontSize: "1.6rem",
};

const subtituloStyle = {
  margin: "6px 0 0",
  opacity: 0.75,
  fontSize: "0.95rem",
};

const contadorStyle = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(46, 204, 113, 0.12)",
  border: "1px solid rgba(46, 204, 113, 0.22)",
  color: "#dff8e8",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
};

const cardStyle = {
  background:
    "linear-gradient(180deg, rgba(31, 41, 55, 0.96), rgba(16, 20, 28, 0.98))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
};

const imagemWrapStyle = {
  width: "100%",
  aspectRatio: "1 / 1",
  background: "#0f1720",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const imagemStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const cardBodyStyle = {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const cabecalhoCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  flexWrap: "wrap",
};

const categoriaBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(46, 204, 113, 0.14)",
  border: "1px solid rgba(46, 204, 113, 0.25)",
  color: "#d9fbe5",
  fontSize: "0.82rem",
  fontWeight: 600,
};

const stockBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "0.82rem",
  fontWeight: 600,
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
};

const nomeStyle = {
  margin: 0,
  fontSize: "1.15rem",
  lineHeight: 1.2,
};

const descricaoStyle = {
  margin: 0,
  fontSize: "0.95rem",
  lineHeight: 1.45,
  opacity: 0.84,
  minHeight: "2.8em",
};

const rodapeCardStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const precoBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "12px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.06)",
};

const labelPrecoStyle = {
  fontSize: "0.78rem",
  opacity: 0.72,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const precoStyle = {
  fontSize: "1.1rem",
  color: "#fff",
};

const botaoComprarStyle = {
  width: "100%",
  justifyContent: "center",
};

const emptyStateStyle = {
  gridColumn: "1 / -1",
  padding: "30px 20px",
  textAlign: "center",
  border: "1px dashed rgba(255,255,255,0.12)",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.03)",
};

export default Produtos;
