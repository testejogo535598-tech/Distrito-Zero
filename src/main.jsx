import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import produtos from "./produtos";
import "./style.css";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [gametag, setGametag] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  function enviarPedido() {
    setPedidoEnviado(true);
  }

  return (
    <div>

      <header>
        <h1>Distrito Zero</h1>
        <p>Loja oficial do servidor</p>

        <button onClick={() => setAbrirCarrinho(true)}>
          🛒 Carrinho ({carrinho.length})
        </button>
      </header>


      <h2>Catálogo</h2>

      <div className="produtos">
        {produtos.map((produto) => (
          <div className="card" key={produto.id}>

            <h3>{produto.nome}</h3>

            <p>{produto.categoria}</p>

            <p>{produto.descricao}</p>

            <strong className="preco">
              {produto.preco} DZ Coins
            </strong>

            <br />

            <button onClick={() => adicionar(produto)}>
              Adicionar ao carrinho
            </button>

          </div>
        ))}
      </div>


      {abrirCarrinho && (

        <div className="carrinho">

          <h2>🛒 Seu Carrinho</h2>


          {carrinho.length === 0 ? (

            <p>Carrinho vazio</p>

          ) : (

            carrinho.map((item, index) => (

              <p key={index}>
                {item.nome} - {item.preco} DZ Coins
              </p>

            ))

          )}


          <h3>Total: {total} DZ Coins</h3>


          <h2>Finalizar pedido</h2>


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
            Enviar pedido
          </button>


          {pedidoEnviado && (
            <p>
              ✅ Pedido enviado<br />
              Status: Aguardando pagamento
            </p>
          )}


          <button onClick={() => setAbrirCarrinho(false)}>
            Fechar carrinho
          </button>


        </div>

      )}

    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
