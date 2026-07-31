import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import produtos from "./produtos";
import "./style.css";

function App() {
  const [categoria, setCategoria] = useState("Todos");
  const [carrinho, setCarrinho] = useState([]);
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [gametag, setGametag] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pedidoEnviado, setPedidoEnviado] = useState(false);


  const categorias = [
    "Todos",
    "Armamentos",
    "Armamentos Especiais",
    "Raid e Operações",
    "Equipamentos",
    "Veículos",
    "Serviços Especiais",
    "Ervas Medicinais",
    "Bandeiras e Braçadeiras"
  ];


  const produtosFiltrados =
    categoria === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria === categoria
        );


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
                quantidade:
                  item.quantidade + 1,
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
      carrinho.filter(
        (item) => item.id !== id
      )
    );
  }


  const total = carrinho.reduce(
    (soma, item) =>
      soma +
      item.preco *
      item.quantidade,
    0
  );


  return (
    <div>

      <header>
        <h1>Distrito Zero</h1>
        <p>Loja oficial do servidor</p>

        <button onClick={() => setAbrirCarrinho(true)}>
          🛒 Carrinho ({carrinho.length})
        </button>
      </header>


      <h2>Categorias</h2>

      <div>

        {categorias.map((cat) => (

          <button
            key={cat}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>

        ))}

      </div>



      <h2>Catálogo</h2>


      <div className="produtos">

        {produtosFiltrados.map((produto) => (

          <div className="card" key={produto.id}>

            <h3>{produto.nome}</h3>

            <p>{produto.categoria}</p>

            <p>{produto.descricao}</p>

            <strong className="preco">
              {produto.preco} DZ Coins
            </strong>

            <br />

            <button
              onClick={() =>
                adicionar(produto)
              }
            >
              Adicionar ao carrinho
            </button>

          </div>

        ))}

      </div>


      {abrirCarrinho && (

        <div className="carrinho">

          <h2>🛒 Seu Carrinho</h2>


          {carrinho.map((item) => (

            <div key={item.id}>

              <p>
                {item.nome}
                <br />
                Quantidade:
                {item.quantidade}
                <br />
                {item.preco *
                item.quantidade}
                DZ Coins
              </p>

              <button
                onClick={() =>
                  remover(item.id)
                }
              >
                ❌ Remover
              </button>

            </div>

          ))}


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


          <button
            onClick={() =>
              setPedidoEnviado(true)
            }
          >
            Enviar pedido
          </button>


          {pedidoEnviado && (
            <p>
              ✅ Pedido enviado<br />
              Status: Aguardando pagamento
            </p>
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
