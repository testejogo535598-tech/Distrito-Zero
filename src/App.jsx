import { useState } from "react";
import Banner from "./components/Banner";
import Avisos from "./components/Avisos";
import ServicosPremium from "./components/ServicosPremium";
import Produtos from "./components/Produtos";
import Carrinho from "./components/Carrinho";
import Rodape from "./components/Rodape";
import Admin from "./components/Admin";

const categorias = ["Todos", "Armas", "Veículos", "Serviços"];

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [modoAdmin, setModoAdmin] = useState(false);

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => {
      const existe = atual.find((item) => item.id === produto.id);

      if (existe) {
        return atual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(id) {
    setCarrinho((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((atual) =>
      atual
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <div style={brandStyle}>Distrito Zero</div>
          <div style={subtitleStyle}>
            Comércio, confiança e sobrevivência
          </div>
        </div>

        <button
          className="btn-comprar"
          onClick={() => setModoAdmin((atual) => !atual)}
          style={adminButtonStyle}
        >
          {modoAdmin ? "🛒 Voltar para a Loja" : "⚙️ Painel Admin"}
        </button>
      </header>

      {modoAdmin ? (
        <Admin />
      ) : (
        <>
          <Banner />

          <Avisos />

          <ServicosPremium />

          <section style={searchSectionStyle}>
            <div style={searchHeaderStyle}>
              <h2 style={sectionTitleStyle}>🛍️ Catálogo</h2>
              <span style={badgeStyle}>Itens atualizados em tempo real</span>
            </div>

            <input
              type="text"
              placeholder="🔍 Pesquisar produto..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              style={searchInputStyle}
            />

            <div style={categoryRowStyle}>
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className="btn-comprar"
                  onClick={() => setCategoria(cat)}
                  style={{
                    ...categoryButtonStyle,
                    opacity: categoria === cat ? 1 : 0.68,
                    boxShadow:
                      categoria === cat
                        ? "0 0 0 1px rgba(46, 204, 113, 0.35)"
                        : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <Produtos
            pesquisa={pesquisa}
            categoria={categoria}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />

          <Carrinho
            carrinho={carrinho}
            aumentarQuantidade={aumentarQuantidade}
            diminuirQuantidade={diminuirQuantidade}
          />

          <Rodape />
        </>
      )}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, rgba(46, 204, 113, 0.08), transparent 30%), #0e1116",
  color: "#fff",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "18px 20px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(8, 12, 18, 0.82)",
  backdropFilter: "blur(10px)",
  position: "sticky",
  top: 0,
  zIndex: 50,
};

const brandStyle = {
  fontSize: "1.4rem",
  fontWeight: 800,
  letterSpacing: "0.4px",
  lineHeight: 1.1,
};

const subtitleStyle = {
  fontSize: "0.9rem",
  opacity: 0.72,
  marginTop: 4,
};

const adminButtonStyle = {
  whiteSpace: "nowrap",
};

const searchSectionStyle = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const searchHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "14px",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "1.15rem",
};

const badgeStyle = {
  fontSize: "0.85rem",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(46, 204, 113, 0.12)",
  border: "1px solid rgba(46, 204, 113, 0.28)",
  color: "#c9f7dd",
};

const searchInputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid rgba(46, 204, 113, 0.55)",
  background: "rgba(18, 24, 31, 0.95)",
  color: "#fff",
  fontSize: "16px",
  marginBottom: "14px",
  boxSizing: "border-box",
  outline: "none",
};

const categoryRowStyle = {
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  paddingBottom: "6px",
};

const categoryButtonStyle = {
  whiteSpace: "nowrap",
  flexShrink: 0,
};

export default App;
