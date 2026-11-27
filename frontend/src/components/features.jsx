// Faixa de recursos da página inicial (personalização da interface e dos estímulos).
function Features() {
  const items = [
    { n: '01', title: 'Uma coisa de cada vez', text: 'Cada tela tem um único desafio, com instruções curtas e sempre no mesmo lugar.' },
    { n: '02', title: 'Errar sem medo', text: 'Sem pontos perdidos e sem tempo. Quando a resposta não é a certa, aparece uma dica gentil.' },
    { n: '03', title: 'Do seu jeito', text: 'Alto contraste, letras maiores, som ligado ou desligado e um modo calmo, sem animações.' },
    { n: '04', title: 'Pausa calma', text: 'Um botão para respirar com calma e voltar ao jogo quando se sentir pronto.' },
  ]
  return (
    <section className="proposal-section features-section">
      <div className="proposal-inner">
        <span className="section-eyebrow">PENSADO PARA CADA CRIANÇA</span>
        <h2>Um espaço previsível, calmo e que respeita o seu ritmo.</h2>
        <div className="proposal-grid is-four">
          {items.map((item) => (
            <article className="proposal-item" key={item.n}>
              <span className="proposal-number">{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
