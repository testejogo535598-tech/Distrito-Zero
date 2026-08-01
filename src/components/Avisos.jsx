function Avisos() {
  const avisos = [
    {
      titulo: "Evento PvP",
      descricao: "Sábado às 20h. Premiação para os vencedores.",
      icone: "🔥"
    },
    {
      titulo: "Transporte",
      descricao: "Serviço de transporte de materiais disponível.",
      icone: "🚚"
    },
    {
      titulo: "Venda de Ervas",
      descricao: "Compre e venda ervas no mercado oficial.",
      icone: "🌿"
    },
    {
      titulo: "Aluguel de Veículos",
      descricao: "Veículos disponíveis para aluguel no servidor.",
      icone: "🚙"
    }
  ]

  return (
    <section className="avisos">
      <h2>📢 Avisos do Servidor</h2>

      <div className="avisos-lista">
        {avisos.map((aviso, index) => (
          <div className="aviso-card" key={index}>

            <h3>
              {aviso.icone} {aviso.titulo}
            </h3>

            <p>
              {aviso.descricao}
            </p>

          </div>
        ))}
      </div>
    </section>
  )
}

export default Avisos
