import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import produtos from "./produtos";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [gametag, setGametag] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  function remover(index) {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  function enviarPedido() {
    if (!gametag) {
      alert("Digite sua gametag.");
      return;
    }

    setPedidoEnviado(true);
  }

  return (
    <div>

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

          {produtos.map((produto) => (
            <div key={produto.id}>

              <h3>{produto.nome}</h3>
              <p>{produto.categoria}</p>
              <p>{produto.descricao}</p>

              <strong>
                {produto.preco} DZ Coins
              </strong>

              <br />

              <button onClick={() => adicionar(produto)}>
                Adicionar ao carrinho
              </button>

            </div>
          ))}
        </>

      ) : (

        <>

          <h2>Carrinho</h2>

          {carrinho.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (

            carrinho.map((item, index) => (

              <div key={index}>
                <p>
                  {item.nome} - {item.preco} DZ Coins
                </p>

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


          <br />


          <textarea
            placeholder="Observação do pedido"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />


          <br />


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

        </>

      )}

    </div>
  );
}


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <App />
);
