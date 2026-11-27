import { useState } from 'react'
import { useSound, speechSupported } from '../sound.js'
import { useTheme } from '../ThemeContext.jsx'

export function Stars({ value = 0, max = 3, size = 'md' }) {
  return (
    <span className={`stars stars-${size}`} role="img" aria-label={`${value} de ${max} estrelas`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'star is-full' : 'star'} aria-hidden="true">{i < value ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

export function SpeakButton({ text, label = 'Ouvir', compact = false }) {
  const sound = useSound()
  const [playing, setPlaying] = useState(false)
  if (!speechSupported()) return null
  function play() {
    if (!sound.soundOn) return
    sound.speak(text)
    setPlaying(true)
    setTimeout(() => setPlaying(false), 900)
  }
  return (
    <button type="button" className={`speak-button ${compact ? 'is-compact' : ''} ${playing ? 'is-playing' : ''}`} onClick={play} disabled={!sound.soundOn}
      aria-label={sound.soundOn ? `${label}: ${text}` : 'Som desligado'} title={sound.soundOn ? label : 'O som está desligado'}>
      <span aria-hidden="true">{sound.soundOn ? '🔊' : '🔇'}</span>
      {!compact && <span>{sound.soundOn ? label : 'Som desligado'}</span>}
    </button>
  )
}

// Aviso gentil para desafios que dependem de áudio quando o som está desligado.
export function AudioNeeded({ needed }) {
  const { soundOn, update } = useTheme()
  if (!needed || soundOn) return null
  return (
    <div className="audio-needed" role="note">
      <span>Este desafio usa som.</span>
      <button type="button" className="game-button is-small" onClick={() => update({ soundOn: true })}>Ligar o som</button>
    </div>
  )
}

export function Prompt({ text, speakText, children }) {
  return (
    <div className="game-prompt">
      <h3>{text}</h3>
      {speakText && <SpeakButton text={speakText} label="Ouvir de novo" />}
      {children}
    </div>
  )
}

export function BigPicture({ emoji, label }) {
  return <div className="big-picture" role="img" aria-label={label || 'figura'}><span aria-hidden="true">{emoji}</span></div>
}

// Botão de resposta com os estados: normal, escolha errada (esmaecida, sem punição), certa e dica.
export function OptionButton({ state = {}, children, onClick, className = '', ariaLabel, ...rest }) {
  const { wrong, correct, hint } = state
  return (
    <button type="button" className={`game-option ${wrong ? 'is-wrong' : ''} ${correct ? 'is-correct' : ''} ${hint ? 'is-hint' : ''} ${className}`}
      onClick={onClick} aria-disabled={wrong || undefined} aria-label={ariaLabel} {...rest}>
      {children}
      {correct && <span className="option-mark" aria-hidden="true">✓</span>}
      {wrong && <span className="option-mark is-soft" aria-hidden="true">↺</span>}
    </button>
  )
}

// Figuras geométricas em CSS (círculo, quadrado, triângulo).
export function Shape({ shape, color }) {
  if (shape === 'triangle') return <span className="shape shape-triangle" style={{ borderBottomColor: color }} aria-hidden="true" />
  return <span className={`shape shape-${shape}`} style={{ background: color }} aria-hidden="true" />
}

// Grupo de objetos (emoji) em fileiras de 5, com opção de riscar alguns.
export function Group({ emoji, count, crossed = 0, label }) {
  return (
    <div className="object-group" role="img" aria-label={label || `${count} objetos`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={i >= count - crossed ? 'object is-crossed' : 'object'} aria-hidden="true">{emoji}</span>
      ))}
    </div>
  )
}

// Embaralhamento determinístico (mesma ordem para o mesmo exercício → previsível ao repetir).
export function seededShuffle(list, seed) {
  let h = 2166136261
  for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) }
  const rand = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000 }
  const out = [...list]
  for (let i = out.length - 1; i > 0; i -= 1) { const j = Math.floor(rand() * (i + 1)); [out[i], out[j]] = [out[j], out[i]] }
  return out
}
