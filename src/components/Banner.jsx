function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay">

        <div className="banner-topo">

          <div className="status-online">
            🟢 <span>Servidor Online</span>
          </div>

          <div className="versao-loja">
            DZ STORE v0.9
          </div>

        </div>

        <h1 className="banner-titulo">
          DISTRITO ZERO
        </h1>

        <h2 className="banner-servidor">
          O Holocausto
        </h2>

        <p className="banner-subtitulo">
          Mercado Oficial do Servidor
        </p>

        <p className="banner-descricao">
          Equipamentos, veículos, armas, kits, moedas e serviços premium
          entregues com rapidez e segurança.
        </p>

        <div className="banner-botoes">

          <button
            className="btn-principal"
            onClick={() =>
              window.scrollTo({
                top: 700,
                behavior: "smooth",
              })
            }
          >
            🛒 Comprar Agora
          </button>

          <button
            className="btn-secundario"
            onClick={() =>
              window.open(
                "https://discord.gg/SEU_LINK",
                "_blank"
              )
            }
          >
            💬 Discord
          </button>

        </div>

        <div className="banner-infos">

          <div>
            ⚡ Entrega rápida
          </div>

          <div>
            🛡 Compra segura
          </div>

          <div>
            💎 Serviços Premium
          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;
