function ServicosPremium() {
  const servicos = [
    {
      nome: "Transporte de Material",
      emoji: "🚚",
      descricao: "Entrega rápida e segura de materiais."
    },
    {
      nome: "Armazém",
      emoji: "📦",
      descricao: "Guarde seus itens com segurança."
    },
    {
      nome: "Venda de Ervas",
      emoji: "🌿",
      descricao: "Compre e venda ervas no mercado."
    },
    {
      nome: "Aluguel de Veículos",
      emoji: "🚙",
      descricao: "Veículos disponíveis para aluguel."
    },
    {
      nome: "Braçadeira",
      emoji: "🟡",
      descricao: "Identifique sua equipe facilmente."
    },
    {
      nome: "Bandeira de Base",
      emoji: "🚩",
      descricao: "Proteja e personalize sua base."
    }
  ]

  return (
    <section className="servicos">
      <h2>⭐ Serviços Premium</h2>

      <div className="servicos-grid">
        {servicos.map((item) => (
          <div className="servico-card" key={item.nome}>

            <div className="icone">
              {item.emoji}
            </div>

            <h3>{item.nome}</h3>

            <p>{item.descricao}</p>

            <button className="btn-comprar">
              Ver Serviço
            </button>

          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicosPremium
