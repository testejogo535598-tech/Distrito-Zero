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
      alert(error.message);
      return;
    }

    setProdutos(data || []);
  }

  async function salvar(produto) {
    const { data, error } = await supabase
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

    console.log(data);
    console.log(error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produto atualizado!");
    
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
    const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmar) return;

    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Produto excluído!");
    
  }

  function atualizarCampo(id, campo, valor) {
    setProdutos((lista) =>
      lista.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <h2>⚙️ Painel Administrativo</h2>

      

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

        <input
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Categoria"
          value={novoProduto.categoria}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, categoria: e.target.value })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Preço"
          type="number"
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, preco: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Moeda"
          value={novoProduto.moeda}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, moeda: e.target.value })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Estoque"
          type="number"
          value={novoProduto.estoque}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, estoque: Number(e.target.value) })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          placeholder="Imagem (/imagens/arquivo.png)"
          value={novoProduto.imagem}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, imagem: e.target.value })
          }
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <label style={{ display: "block", marginBottom: 8 }}>
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

        <label style={{ display: "block", marginBottom: 15 }}>
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

          <label>📝 Nome</label>
          <input
            type="text"
            value={produto.nome || ""}
            onChange={(e) => atualizarCampo(produto.id, "nome", e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label>📂 Categoria</label>
          <input
            type="text"
            value={produto.categoria || ""}
            onChange={(e) =>
              atualizarCampo(produto.id, "categoria", e.target.value)
            }
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label>📝 Descrição</label>
          <textarea
            value={produto.descricao || produto.descrição || ""}
            onChange={(e) =>
              atualizarCampo(produto.id, "descricao", e.target.value)
            }
            style={{ width: "100%", marginBottom: 10, padding: 10, minHeight: 90 }}
          />

          <label>💰 Preço</label>
          <input
            type="number"
            value={produto.preco}
            onChange={(e) =>
              atualizarCampo(produto.id, "preco", e.target.value)
            }
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label>💱 Moeda</label>
          <input
            type="text"
            value={produto.moeda || ""}
            onChange={(e) =>
              atualizarCampo(produto.id, "moeda", e.target.value)
            }
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label>📦 Estoque</label>
          <input
            type="number"
            value={produto.estoque}
            disabled={produto.estoque_infinito}
            onChange={(e) =>
              atualizarCampo(produto.id, "estoque", e.target.value)
            }
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label>🖼 Imagem</label>
          <input
            type="text"
            value={produto.imagem || ""}
            onChange={(e) =>
              atualizarCampo(produto.id, "imagem", e.target.value)
            }
            placeholder="/imagens/arquivo.png"
            style={{ width: "100%", marginBottom: 10, padding: 10 }}
          />

          <label style={{ display: "block", marginBottom: 10 }}>
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

          <label style={{ display: "block", marginBottom: 15 }}>
            <input
              type="checkbox"
              checked={produto.visivel}
              onChange={(e) =>
                atualizarCampo(produto.id, "visivel", e.target.checked)
              }
            />{" "}
            👁 Produto visível
          </label>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn-comprar" onClick={() => salvar(produto)}>
              💾 Salvar
            </button>

            <button
              className="btn-comprar"
              onClick={() => excluirProduto(produto.id)}
              style={{ background: "#b91c1c" }}
            >
              🗑 Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
