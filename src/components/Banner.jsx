function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay">

        <div className="status-online">
          🟢 <span>Servidor Online</span>
        </div>

        <h1>DISTRITO ZERO</h1>

        <p className="banner-subtitulo">
          Mercado Oficial do Servidor O Holocausto
        </p>

        <div className="banner-botoes">

          <button className="btn-principal">
            🛒 Entrar na Loja
          </button>

          <button
            className="btn-secundario"
            onClick={() =>
              window.open("https://discord.gg/SEU_LINK", "_blank")
            }
          >
            💬 Entrar no Discord
          </button>

        </div>

      </div>
    </section>
  )
}

export default Banner
