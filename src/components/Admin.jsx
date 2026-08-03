import { useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";

const categoriasPadrao = [
  "Todos",
  "Armas",
  "Veículos",
  "Roupas",
  "Mochilas",
  "Ferramentas",
  "Medicina",
  "Alimentos",
  "Construção",
  "Utilitários",
  "Itens Especiais",
  "Serviços",
];

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [filtroVisibilidade, setFiltroVisibilidade] = useState("Todos");
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "Armas",
    descricao: "",
    preco: 0,
    moeda: "DZ Coins",
    estoque: 0,
    estoque_infinito: false,
    visivel: true,
    imagem: "",
  });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarProdutos();

    const canal = supabase
      .channel("admin-produtos-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "produtos" },
        () => carregarProdutos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    setProdutos(data || []);
  }

  async function salvar(produto) {
    const { error } = await supabase
      .from("produtos")
      .update({
        nome: produto.nome,
        categoria: produto.categoria,
        descricao: produto.descricao ?? "",
        preco: Number(produto.preco),
        moeda: produto.moeda,
        estoque: Number(produto.estoque),
        estoque_infinito: produto.estoque_infinito,
        visivel: produto.visivel,
        imagem: produto.imagem ?? "",
      })
      .eq("id", produto.id)
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produto atualizado!");
    setEditandoId(null);
  }

  async function criarProduto() {
    const payload = {
      nome: novoProduto.nome,
      categoria: novoProduto.categoria,
      descricao: novoProduto.descricao ?? "",
      preco: Number(novoProduto.preco),
      moeda: novoProduto.moeda,
      estoque: Number(novoProduto.estoque),
      estoque_infinito: novoProduto.estoque_infinito,
      visivel: novoProduto.visivel,
      imagem: novoProduto.imagem ?? "",
    };

    const { error } = await supabase.from("produtos").insert([payload]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Produto criado!");

    setNovoProduto({
      nome: "",
      categoria: "Armas",
      descricao: "",
      preco: 0,
      moeda: "DZ Coins",
      estoque: 0,
      estoque_infinito: false,
      visivel: true,
      imagem: "",
    });
  }

  async function excluirProduto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmar) return;

    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produto excluído!");
    if (editandoId === id) setEditandoId(null);
  }

  function atualizarCampo(id, campo, valor) {
    setProdutos((lista) =>
      lista.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  }

  const categoriasDisponiveis = useMemo(() => {
    const din = produtos
      .map((p) => p.categoria)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    const unicas = [...new Set(din)];
    return ["Todos", ...unicas];
  }, [produtos]);

  const produtosFiltrados = useMemo(() => {
    const buscaNormalizada = busca.trim().toLowerCase();

    return produtos.filter((item) => {
      const nome = (item.nome || "").toLowerCase();
      const categoria = item.categoria || "";
      const estoque = Number(item.estoque ?? 0);

      const pesquisaOk = nome.includes(buscaNormalizada);
      const categoriaOk =
        filtroCategoria === "Todos" || categoria === filtroCategoria;

      const visivelOk =
        filtroVisibilidade === "Todos" ||
        (filtroVisibilidade === "Visíveis" && item.visivel !== false) ||
        (filtroVisibilidade === "Ocultos" && item.visivel === false) ||
        (filtroVisibilidade === "Sem estoque" &&
          !item.estoque_infinito &&
          estoque <= 0) ||
        (filtroVisibilidade === "Estoque infinito" &&
          item.estoque_infinito === true);

      return pesquisaOk && categoriaOk && visivelOk;
    });
  }, [busca, filtroCategoria, filtroVisibilidade, produtos]);

  const totalProdutos = produtos.length;
  const totalVisiveis = produtos.filter((p) => p.visivel !== false).length;
  const totalOcultos = produtos.filter((p) => p.visivel === false).length;
  const totalSemEstoque = produtos.filter(
    (p) => !p.estoque_infinito && Number(p.estoque ?? 0) <= 0
  ).length;

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 15 }}>⚙️ Painel Administrativo</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={cardResumo}>
          <strong>Total</strong>
          <div>{totalProdutos}</div>
        </div>
        <div style={cardResumo}>
          <strong>Visíveis</strong>
          <div>{totalVisiveis}</div>
        </div>
        <div style={cardResumo}>
          <strong>Ocultos</strong>
          <div>{totalOcultos}</div>
        </div>
        <div style={cardResumo}>
          <strong>Sem estoque</strong>
          <div>{totalSemEstoque}</div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #555",
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          background: "#222",
        }}
      >
        <h3 style={{ marginTop: 0 }}>🔍 Filtros</h3>

        <input
          placeholder="Pesquisar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={inputStyle}
        />

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={inputStyle}
        >
          {categoriasDisponiveis.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filtroVisibilidade}
          onChange={(e) => setFiltroVisibilidade(e.target.value)}
          style={inputStyle}
        >
          <option value="Todos">Todos</option>
          <option value="Visíveis">Visíveis</option>
          <option value="Ocultos">Ocultos</option>
          <option value="Sem estoque">Sem estoque</option>
          <option value="Estoque infinito">Estoque infinito</option>
        </select>
      </div>

      <div
        style={{
          border: "1px solid #555",
          borderRadius: 12,
          padding: 16,
          marginBottom: 25,
          background: "#222",
        }}
      >
        <h3>➕ Novo Produto</h3>

        <div style={gridForm}>
          <input
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, nome: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Categoria"
            value={novoProduto.categoria}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, categoria: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Descrição"
            value={novoProduto.descricao}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, descricao: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Preço"
            type="number"
            value={novoProduto.preco}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, preco: Number(e.target.value) })
            }
            style={inputStyle}
          />

          <input
            placeholder="Moeda"
            value={novoProduto.moeda}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, moeda: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Estoque"
            type="number"
            value={novoProduto.estoque}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, estoque: Number(e.target.value) })
            }
            style={inputStyle}
          />

          <input
            placeholder="Imagem (/imagens/arquivo.png)"
            value={novoProduto.imagem}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, imagem: e.target.value })
            }
            style={inputStyle}
          />
        </div>

        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={novoProduto.estoque_infinito}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                estoque_infinito: e.target.checked,
              })
            }
          />{" "}
          ♾️ Estoque infinito
        </label>

        <label style={{ ...labelStyle, marginBottom: 15 }}>
          <input
            type="checkbox"
            checked={novoProduto.visivel}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                visivel: e.target.checked,
              })
            }
          />{" "}
          👁 Produto visível
        </label>

        <button className="btn-comprar" onClick={criarProduto}>
          ➕ Criar Produto
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {produtosFiltrados.map((produto) => {
          const estoque = Number(produto.estoque ?? 0);
          const statusEstoque = produto.estoque_infinito
            ? "♾️ Infinito"
            : estoque > 5
            ? "🟢 Em estoque"
            : estoque > 0
            ? `🟡 Últimas unidades (${estoque})`
            : "🔴 Esgotado";

          return (
            <div key={produto.id} style={cardProduto}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{produto.nome}</strong>
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 999,
                    background: produto.visivel === false ? "#7f1d1d" : "#14532d",
                    color: "#fff",
                  }}
                >
                  {produto.visivel === false ? "Oculto" : "Visível"}
                </span>
              </div>

              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.9 }}>
                <div>📂 {produto.categoria}</div>
                <div>💰 {produto.preco} {produto.moeda}</div>
                <div>📦 {statusEstoque}</div>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  className="btn-comprar"
                  onClick={() =>
                    setEditandoId(editandoId === produto.id ? null : produto.id)
                  }
                >
                  ✏️ {editandoId === produto.id ? "Fechar" : "Editar"}
                </button>

                <button
                  className="btn-comprar"
                  onClick={() => excluirProduto(produto.id)}
                  style={{ background: "#b91c1c" }}
                >
                  🗑 Excluir
                </button>
              </div>

              {editandoId === produto.id && (
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: "1px solid #444",
                  }}
                >
                  <label style={labelStyle}>📝 Nome</label>
                  <input
                    type="text"
                    value={produto.nome || ""}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "nome", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label style={labelStyle}>📂 Categoria</label>
                  <input
                    type="text"
                    value={produto.categoria || ""}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "categoria", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label style={labelStyle}>📝 Descrição</label>
                  <textarea
                    value={produto.descricao || produto.descrição || ""}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "descricao", e.target.value)
                    }
                    style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  />

                  <label style={labelStyle}>💰 Preço</label>
                  <input
                    type="number"
                    value={produto.preco}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "preco", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label style={labelStyle}>💱 Moeda</label>
                  <input
                    type="text"
                    value={produto.moeda || ""}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "moeda", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label style={labelStyle}>📦 Estoque</label>
                  <input
                    type="number"
                    value={produto.estoque}
                    disabled={produto.estoque_infinito}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "estoque", e.target.value)
                    }
                    style={inputStyle}
                  />

                  <label style={labelStyle}>🖼 Imagem</label>
                  <input
                    type="text"
                    value={produto.imagem || ""}
                    onChange={(e) =>
                      atualizarCampo(produto.id, "imagem", e.target.value)
                    }
                    placeholder="/imagens/arquivo.png"
                    style={inputStyle}
                  />

                  <label style={labelStyle}>
                    <input
                      type="checkbox"
                      checked={produto.estoque_infinito}
                      onChange={(e) =>
                        atualizarCampo(
                          produto.id,
                          "estoque_infinito",
                          e.target.checked
                        )
                      }
                    />{" "}
                    ♾️ Estoque infinito
                  </label>

                  <label style={{ ...labelStyle, marginBottom: 14 }}>
                    <input
                      type="checkbox"
                      checked={produto.visivel}
                      onChange={(e) =>
                        atualizarCampo(produto.id, "visivel", e.target.checked)
                      }
                    />{" "}
                    👁 Produto visível
                  </label>

                  <button className="btn-comprar" onClick={() => salvar(produto)}>
                    💾 Salvar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {produtosFiltrados.length === 0 && (
        <div style={{ marginTop: 20, textAlign: "center", opacity: 0.8 }}>
          <h3>Nenhum produto encontrado.</h3>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 10,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #444",
  background: "#111",
  color: "#fff",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: 600,
};

const gridForm = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 10,
};

const cardResumo = {
  border: "1px solid #444",
  borderRadius: 12,
  padding: 14,
  background: "#1b1b1b",
  textAlign: "center",
};

const cardProduto = {
  border: "1px solid #444",
  borderRadius: 12,
  padding: 16,
  background: "#1b1b1b",
};

export default Admin;
