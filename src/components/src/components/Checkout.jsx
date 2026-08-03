function Checkout({ carrinho, fechar }) {
  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  function copiarPix() {
    navigator.clipboard.writeText("joao.schwendtner@bol.com.br");
    alert("✅ Chave PIX copiada!");
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#161b22",
          border: "1px solid #2ecc71",
          borderRadius: 16,
          padding: 25,
          color: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginTop: 0 }}>💳 Finalizar Compra</h2>

        {carrinho.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              borderBottom: "1px solid #333",
              paddingBottom: 10,
            }}
          >
            <span>
              {item.nome} × {item.quantidade}
            </span>

            <strong>
              {item.preco * item.quantidade} {item.moeda}
            </strong>
          </div>
        ))}

        <h3 style={{ marginTop: 25 }}>
          Total: 💰 {total} DZ Coins
        </h3>

        <hr />

        <p>
          <strong>Pagamento via PIX</strong>
        </p>

        <div
          style={{
            background: "#222",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
            wordBreak: "break-word",
          }}
        >
          joao.schwendtner@bol.com.br
        </div>

        <button
          className="btn-comprar"
          onClick={copiarPix}
          style={{ width: "100%", marginBottom: 10 }}
        >
          📋 Copiar Chave PIX
        </button>

        <button
          className="btn-comprar"
          style={{ width: "100%", marginBottom: 10 }}
          onClick={() =>
            window.open(
              "https://discord.gg/X2fVcpP7Qp",
              "_blank"
            )
          }
        >
          💬 Entrar no Discord
        </button>

        <button
          className="btn-comprar"
          style={{ width: "100%", marginBottom: 20 }}
          onClick={() =>
            window.open(
              "https://chat.whatsapp.com/DDWxSOgVnkjIt7rl3jJrs2",
              "_blank"
            )
          }
        >
          📱 Grupo do WhatsApp
        </button>

        <button
          className="btn-comprar"
          style={{
            width: "100%",
            background: "#444",
          }}
          onClick={fechar}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Checkout;
