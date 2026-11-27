import { useEffect, useState } from 'react'
import Navbar from '../components/navbar.jsx'
import Footer from '../components/footer.jsx'
import { FONT_SCALES, useTheme } from '../ThemeContext.jsx'
import { useSound } from '../sound.js'
import { useAuth } from '../AuthContext.jsx'
import { Link } from 'react-router-dom'
import feliz from '../assets/feliz.png'

function Switch({ id, checked, onChange, label, description }) {
  return (
    <div className="setting-row">
      <div>
        <label htmlFor={id}>{label}</label>
        <p>{description}</p>
      </div>
      <button id={id} type="button" role="switch" aria-checked={checked} className={`big-switch ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}>
        <span className="big-switch-knob" aria-hidden="true" />
        <span className="big-switch-text">{checked ? 'Ligado' : 'Desligado'}</span>
      </button>
    </div>
  )
}

// Tela de personalização da interface e dos estímulos (artigo, seção 4.4).
export default function Accessibility() {
  const { darkMode, highContrast, fontScale, soundOn, calmMode, year, update } = useTheme()
  const { user } = useAuth()
  const sound = useSound()
  const [installEvent, setInstallEvent] = useState(null)

  useEffect(() => {
    const onPrompt = (event) => { event.preventDefault(); setInstallEvent(event) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  return (
    <div className="site-page settings-page">
      <Navbar />
      <main className="settings-main">
        <div className="settings-container">
          <header className="settings-heading">
            <img src={feliz} alt="" />
            <div>
              <span className="section-eyebrow">MEU JEITO DE APRENDER</span>
              <h1>Personalizar o AltLearn</h1>
              <p>Ajuste as cores, o tamanho das letras e os sons. As mudanças valem na hora{user ? ' e ficam salvas na sua conta' : ''}.</p>
            </div>
          </header>

          <section className="settings-card" aria-labelledby="text-size">
            <h2 id="text-size">Tamanho das letras</h2>
            <div className="font-options" role="radiogroup" aria-label="Tamanho das letras">
              {FONT_SCALES.map((option, i) => (
                <button key={option.value} type="button" role="radio" aria-checked={fontScale === option.value}
                  className={`font-option ${fontScale === option.value ? 'is-active' : ''}`} onClick={() => update({ fontScale: option.value })}>
                  <span className="font-sample" style={{ fontSize: `${18 + i * 7}px` }} aria-hidden="true">{option.sample}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <p className="settings-preview">Assim fica o texto: “Toda descoberta começa com um pequeno passo.”</p>
          </section>

          <section className="settings-card" aria-labelledby="look">
            <h2 id="look">Cores</h2>
            <Switch id="s-contrast" checked={highContrast} onChange={(v) => update({ highContrast: v })} label="Alto contraste" description="Fundo preto e letras claras, mais fácil de enxergar." />
            <Switch id="s-dark" checked={darkMode} onChange={(v) => update({ darkMode: v })} label="Modo escuro" description="Cores mais escuras e suaves para os olhos." />
          </section>

          <section className="settings-card" aria-labelledby="stimuli">
            <h2 id="stimuli">Sons e movimento</h2>
            <Switch id="s-sound" checked={soundOn} onChange={(v) => update({ soundOn: v })} label="Som" description="Efeitos suaves e voz que lê as palavras." />
            <div className="setting-row is-inline">
              <div><strong>Testar o som</strong><p>Ouça como soa antes de jogar.</p></div>
              <button type="button" className="game-button is-small" disabled={!soundOn} onClick={() => { sound.correct(); sound.speak('Olá! Vamos aprender juntos?') }}>Ouvir</button>
            </div>
            <Switch id="s-calm" checked={calmMode} onChange={(v) => update({ calmMode: v })} label="Modo calmo" description="Sem animações e sem faíscas. A tela fica bem quietinha." />
          </section>

          <section className="settings-card" aria-labelledby="grade">
            <h2 id="grade">Meu ano</h2>
            <div className="year-toggle" role="group" aria-label="Escolha o ano">
              {[1, 2].map((y) => <button key={y} type="button" className={y === year ? 'is-active' : ''} aria-pressed={y === year} onClick={() => update({ year: y })}>{y}º ano</button>)}
            </div>
          </section>

          <section className="settings-card" aria-labelledby="install">
            <h2 id="install">Usar como aplicativo</h2>
            <p className="settings-preview">O AltLearn pode ser instalado no celular, tablet ou computador, como um aplicativo.</p>
            {installEvent
              ? <button type="button" className="game-button" onClick={async () => { installEvent.prompt(); await installEvent.userChoice; setInstallEvent(null) }}>Instalar o AltLearn</button>
              : <p className="settings-preview">Se o botão de instalar não aparecer, use o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.</p>}
          </section>

          {!user && <p className="settings-footer">Quer guardar essas escolhas e as suas estrelas em qualquer aparelho? <Link to="/cadastro">Criar conta</Link></p>}
        </div>
      </main>
      <Footer />
    </div>
  )
}
