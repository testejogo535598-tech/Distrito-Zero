import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import produtos from "./produtos";
import "./style.css";

function App() {
  const [carrinho, setCarrinho] = useState([]);

  function adicionar(produto) {
    setCarrinho([...carrinho, produto]);
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco,
    0
  );

  return (
    <div>
      <header>
        <h1>Distrito Zero</h1>
        <p>Loja oficial do servidor</p>
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

      <hr />

      <div className="carrinho">
        <h2>Carrinho</h2>

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

        <button>
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
