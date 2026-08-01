function Avisos() {
  const avisos = [
    '🔥 Evento PvP sábado às 20h',
    '🚚 Transporte de Material disponível',
    '🌿 Venda de Ervas liberada',
    '🚙 Aluguel de Veículos ativo'
  ]

  return (
    <section className="avisos">
      <h2>📢 Avisos do Servidor</h2>

      <div className="avisos-lista">
        {avisos.map((aviso, index) => (
          <div className="aviso-card" key={index}>
            {aviso}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Avisos
