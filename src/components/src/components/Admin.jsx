import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("nome");

    setProdutos(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Painel Administrativo</h2>

      {produtos.map((produto) => (
        <div
          key={produto.id}
          style={{
            border: "1px solid #444",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
          }}
        >
          <h3>{produto.nome}</h3>

          <p>Preço: {produto.preco}</p>
          <p>Estoque: {produto.estoque}</p>
          <p>Visível: {produto.visivel ? "Sim" : "Não"}</p>
        </div>
      ))}
    </div>
  );
}

export default Admin;
