function ServicosPremium() {
  const servicos = [
    {
      nome: 'Transporte de Material',
      emoji: '🚚'
    },
    {
      nome: 'Armazém',
      emoji: '📦'
    },
    {
      nome: 'Venda de Ervas',
      emoji: '🌿'
    },
    {
      nome: 'Aluguel de Veículos',
      emoji: '🚙'
    },
    {
      nome: 'Braçadeira',
      emoji: '🟡'
    },
    {
      nome: 'Bandeira de Base',
      emoji: '🚩'
    }
  ]

  return (
    <section className="servicos">
      <h2>⭐ Serviços Premium</h2>

      <div className="servicos-grid">
        {servicos.map((item) => (
          <div className="servico-card" key={item.nome}>
            <div className="icone">{item.emoji}</div>
            <h3>{item.nome}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicosPremium
