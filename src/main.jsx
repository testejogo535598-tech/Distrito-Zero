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
    const existe = carrinho.find(
      (item) => item.id === produto.id
    );

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: 1,
        },
      ]);
    }
  }

  function remover(id) {
    setCarrinho(
      carrinho.filter((item) => item.id !== id)
    );
  }

  const total = carrinho.reduce(
    (soma, item) =>
      soma + item.preco * item.quantidade,
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

            carrinho.map((item) => (

              <div key={item.id}>

                <p>
                  {item.nome}
                  <br />
                  Quantidade: {item.quantidade}
                  <br />
                  Valor:
                  {item.preco * item.quantidade} DZ Coins
                </p>


                <button onClick={() => remover(item.id)}>
                  ❌ Remover
                </button>

              </div>

            ))

          )}


          <h3>
            Total: {total} DZ Coins
          </h3>



          <h2>Finalizar pedido</h2>


          <input
            placeholder="Gametag do jogador"
            value={gametag}
            onChange={(e) =>
              setGametag(e.target.value)
            }
          />


          <textarea
            placeholder="Observação do pedido"
            value={observacao}
            onChange={(e) =>
              setObservacao(e.target.value)
            }
          />


          <button onClick={enviarPedido}>
            Enviar pedido
          </button>



          {pedidoEnviado && (

            <div>

              <h3>
                ✅ Pedido enviado
              </h3>

              <p>
                Status: Aguardando pagamento
              </p>

            </div>

          )}



          <button onClick={() => setAbrirCarrinho(false)}>
            Fechar carrinho
          </button>


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
