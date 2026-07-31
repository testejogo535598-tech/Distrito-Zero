import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import produtos from "./produtos";
import "./style.css";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [categoria, setCategoria] = useState("Todos");
  const [gametag, setGametag] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  function remover(index) {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  function enviarPedido() {
    if (gametag.trim() === "") {
      alert("Digite sua gametag.");
      return;
    }

    setPedidoEnviado(true);
  }

  const categorias = [
    "Todos",
    "Armamentos",
    "Equipamentos",
    "Veículos",
    "Raid",
    "Serviços Especiais",
    "Ervas Medicinais",
    "Bandeiras e Conquistas"
  ];

  const produtosFiltrados =
    categoria === "Todos"
      ? produtos
      : produtos.filter(
          (produto) => produto.categoria === categoria
        );

  return (
    <div className="app">

      <header>
        <h1>Distrito Zero</h1>
        <p>Loja oficial do servidor</p>

        <button onClick={() => setMostrarCarrinho(true)}>
          🛒 Carrinho ({carrinho.length})
        </button>
      </header>


      {!mostrarCarrinho ? (

        <>

          <h2>Catálogo</h2>


          <div className="categorias">

            {categorias.map((cat) => (

              <button
                key={cat}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>

            ))}

          </div>


          <div className="catalogo">

            {produtosFiltrados.map((produto) => (

              <div className="produto" key={produto.id}>

                <h3>{produto.nome}</h3>

                <p>
                  {produto.categoria}
                </p>

                <p>
                  {produto.descricao}
                </p>

                <strong>
                  {produto.preco} DZ Coins
                </strong>

                <br />

                <button onClick={() => adicionar(produto)}>
                  Adicionar ao carrinho
                </button>

              </div>

            ))}

          </div>

        </>

      ) : (

        <div className="carrinho">

          <h2>🛒 Carrinho</h2>


          {carrinho.length === 0 ? (

            <p>Carrinho vazio</p>

          ) : (

            carrinho.map((item, index) => (

              <div className="produto" key={index}>

                <p>
                  {item.nome}
                </p>

                <strong>
                  {item.preco} DZ Coins
                </strong>

                <br />

                <button onClick={() => remover(index)}>
                  Remover
                </button>

              </div>

            ))

          )}


          <h3>
            Total: {total} DZ Coins
          </h3>


          <h2>Finalizar Pedido</h2>


          <input
            placeholder="Gametag do jogador"
            value={gametag}
            onChange={(e) => setGametag(e.target.value)}
          />


          <textarea
            placeholder="Observação do pedido"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />


          <button onClick={enviarPedido}>
            Enviar Pedido
          </button>


          <button onClick={() => setMostrarCarrinho(false)}>
            Voltar ao catálogo
          </button>


          {pedidoEnviado && (

            <h3>
              🟡 Pedido enviado — Aguardando pagamento
            </h3>

          )}

        </div>

      )}

    </div>
  );
}


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <App />
);
