import { useMemo } from 'react'
import { useTheme } from './ThemeContext.jsx'

// Sons suaves (tons curtos, volume baixo) e leitura em voz alta (Web Speech API, pt-BR).
// Tudo respeita o controle de som do usuário.
let ctx
function audio() {
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, start, dur, gain = 0.06) {
  const ac = audio()
  if (!ac) return
  const osc = ac.createOscillator()
  const amp = ac.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  const t = ac.currentTime + start
  amp.gain.setValueAtTime(0.0001, t)
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.02)
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(amp)
  amp.connect(ac.destination)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

export const sfx = {
  correct() { tone(523.25, 0, 0.16); tone(659.25, 0.12, 0.22) },          // dó → mi
  soft() { tone(330, 0, 0.18, 0.035) },                                    // tom baixo e curto, sem susto
  cheer() { tone(523.25, 0, 0.14); tone(659.25, 0.12, 0.14); tone(783.99, 0.24, 0.3) },
  tick() { tone(880, 0, 0.07, 0.05) },
  pop() { tone(620, 0, 0.08, 0.04) },
}

let cachedVoice
function pickVoice() {
  if (cachedVoice) return cachedVoice
  const voices = window.speechSynthesis?.getVoices?.() ?? []
  cachedVoice = voices.find((v) => v.lang?.toLowerCase() === 'pt-br') || voices.find((v) => v.lang?.toLowerCase().startsWith('pt'))
  return cachedVoice
}

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function speak(text, rate = 0.85) {
  if (!speechSupported()) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'pt-BR'
  utter.rate = rate
  const voice = pickVoice()
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel()
}

// Hook: devolve as funções já "travadas" no controle de som do usuário.
// eslint-disable-next-line react-refresh/only-export-components
export function useSound() {
  const { soundOn } = useTheme()
  return useMemo(() => ({
    soundOn,
    correct: () => soundOn && sfx.correct(),
    soft: () => soundOn && sfx.soft(),
    cheer: () => soundOn && sfx.cheer(),
    tick: () => soundOn && sfx.tick(),
    pop: () => soundOn && sfx.pop(),
    speak: (text, rate) => soundOn && speak(text, rate),
    stop: stopSpeaking,
  }), [soundOn])
}
