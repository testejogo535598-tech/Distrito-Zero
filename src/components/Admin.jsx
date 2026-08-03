import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [produtos, setProdutos] = useState([]);
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

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    if (error) {
      console.log(error);
      return;
    }

    setProdutos(data || []);
  }

  async function salvar(produto) {
  const { data, error } = await supabase
    .from("produtos")
    .update({
      preco: Number(produto.preco),
      estoque: Number(produto.estoque),
      estoque_infinito: produto.estoque_infinito,
      visivel: produto.visivel,
    })
    .eq("id", produto.id)
    .select();

  console.log(data);
  console.log(error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Produto atualizado!");
  carregarProdutos();
  } 

  function atualizarCampo(id, campo, valor) {
    setProdutos((lista) =>
      lista.map((p) =>
        p.id === id
          ? { ...p, [campo]: valor }
          : p
      )
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>⚙️ Painel Administrativo</h2>

      <button
        className="btn-comprar"
        onClick={carregarProdutos}
        style={{ marginBottom: 20 }}
      >
        🔄 Atualizar
      </button>

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            border: "1px solid #444",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            background: "#1b1b1b",
          }}
        >
          <h3>{produto.nome}</h3>

          <label>💰 Preço</label>
          <input
            type="number"
            value={produto.preco}
            onChange={(e) =>
              atualizarCampo(
                produto.id,
                "preco",
                e.target.value
              )
            }
            style={{
              width: "100%",
              marginBottom: 10,
            }}
          />

          <label>📦 Estoque</label>
          <input
            type="number"
            value={produto.estoque}
            disabled={produto.estoque_infinito}
            onChange={(e) =>
              atualizarCampo(
                produto.id,
                "estoque",
                e.target.value
              )
            }
            style={{
              width: "100%",
              marginBottom: 10,
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: 10,
            }}
          >
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

          <label
            style={{
              display: "block",
              marginBottom: 15,
            }}
          >
            <input
              type="checkbox"
              checked={produto.visivel}
              onChange={(e) =>
                atualizarCampo(
                  produto.id,
                  "visivel",
                  e.target.checked
                )
              }
            />{" "}
            👁 Produto visível
          </label>

          <button
            className="btn-comprar"
            onClick={() => salvar(produto)}
          >
            💾 Salvar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
