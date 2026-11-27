import { useEffect, useRef } from 'react'

// "Pausa calma": uma tela tranquila para a criança se regular antes de continuar. Sem tempo, sem pontuação.
export default function BreakOverlay({ onClose }) {
  const button = useRef(null)
  useEffect(() => {
    button.current?.focus()
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="break-overlay" role="dialog" aria-modal="true" aria-labelledby="break-title">
      <div className="break-card">
        <span className="section-eyebrow">PAUSA CALMA</span>
        <h2 id="break-title">Vamos respirar juntos.</h2>
        <div className="breathing" aria-hidden="true"><span /></div>
        <p>Encha a barriguinha de ar devagar… e solte bem de leve. O jogo espera você.</p>
        <button type="button" className="game-button" ref={button} onClick={onClose}>Voltar ao jogo</button>
      </div>
    </div>
  )
}
