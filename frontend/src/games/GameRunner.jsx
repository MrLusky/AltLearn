import { useEffect, useMemo, useRef, useState } from 'react'
import BreakOverlay from './BreakOverlay.jsx'
import { GAME_COMPONENTS } from './index.js'
import { Stars } from './ui.jsx'
import { calcStars, FINISH_MESSAGES, OK_MESSAGES, TRY_MESSAGES } from './stars.js'
import { useSound } from '../sound.js'
import { useTheme } from '../ThemeContext.jsx'
import { useProgress } from '../ProgressContext.jsx'

const pick = (list, seed) => list[seed % list.length]

// Estrutura previsível em todos os jogos: barra superior fixa → enunciado → atividade → feedback → botão de seguir.
export default function GameRunner({ activity, level, onExit, onReplay, onNext }) {
  const Exercise = GAME_COMPONENTS[activity.slug]
  const exercises = level.exercises
  const sound = useSound()
  const { soundOn, update } = useTheme()
  const { recordSession } = useProgress()

  const [index, setIndex] = useState(0)
  const [solved, setSolved] = useState(false)
  const [message, setMessage] = useState(null)
  const [paused, setPaused] = useState(false)
  const [result, setResult] = useState(null)
  const nextButton = useRef(null)
  const stats = useRef({ mistakes: 0, hints: 0, attempts: [], attemptNo: 0, started: Date.now(), exerciseStart: Date.now(), counter: 0 })
  const exercise = exercises[index]

  const report = useMemo(() => ({
    answer(correct, choice) {
      const s = stats.current
      s.attemptNo += 1
      s.counter += 1
      s.attempts.push({ exercise_key: exercise.id, chosen: String(choice).slice(0, 60), is_correct: correct, attempt_no: s.attemptNo, response_ms: Date.now() - s.exerciseStart })
      if (correct) { sound.pop(); setMessage({ kind: 'ok', text: pick(OK_MESSAGES, s.counter) }) }
      else { s.mistakes += 1; sound.soft(); setMessage({ kind: 'try', text: pick(TRY_MESSAGES, s.counter) }) }
    },
    complete() {
      setSolved(true)
      sound.correct()
      setMessage({ kind: 'ok', text: 'Desafio completo! Muito bem!' })
    },
    hint() {
      stats.current.hints += 1
      setMessage({ kind: 'hint', text: 'Olhe com calma: deixei uma dica brilhando para você.' })
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [index, soundOn])

  useEffect(() => { if (solved) nextButton.current?.focus() }, [solved])
  useEffect(() => () => sound.stop(), [sound])

  function goNext() {
    sound.stop()
    if (index < exercises.length - 1) {
      stats.current.attemptNo = 0
      stats.current.exerciseStart = Date.now()
      setIndex(index + 1)
      setSolved(false)
      setMessage(null)
      return
    }
    const s = stats.current
    const stars = calcStars(s)
    recordSession({
      activity: activity.slug, grade_year: level.year, level: level.level,
      correct: exercises.length, total: exercises.length, mistakes: s.mistakes, hints: s.hints, stars,
      duration_seconds: Math.round((Date.now() - s.started) / 1000), attempts: s.attempts.slice(0, 300),
    })
    sound.cheer()
    setResult({ stars, mistakes: s.mistakes })
  }

  if (result) {
    return (
      <section className="game-card is-finished" aria-labelledby="finish-title">
        <span className="section-eyebrow">FASE CONCLUÍDA</span>
        <div className="finish-stars"><Stars value={result.stars} size="xl" /></div>
        <h2 id="finish-title">{FINISH_MESSAGES[result.stars]}</h2>
        <p>Você completou “{level.title}” — {activity.title}, {level.year}º ano.</p>
        <div className="game-actions is-centered">
          {onNext && <button type="button" className="game-button" onClick={onNext}>Próxima fase</button>}
          <button type="button" className="game-button is-secondary" onClick={onReplay}>Jogar de novo</button>
          <button type="button" className="game-button is-secondary" onClick={onExit}>Voltar às fases</button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-card" aria-labelledby="game-title">
      <div className="game-topbar">
        <button type="button" className="game-chip" onClick={onExit} aria-label="Sair do jogo e voltar às fases"><span aria-hidden="true">←</span> Sair</button>
        <ol className="step-dots" aria-label={`Exercício ${index + 1} de ${exercises.length}`}>
          {exercises.map((e, i) => <li key={e.id} className={i < index || (i === index && solved) ? 'is-done' : i === index ? 'is-current' : ''} aria-current={i === index ? 'step' : undefined} />)}
        </ol>
        <div className="game-topbar-actions">
          <button type="button" className="game-chip" onClick={() => setPaused(true)}><span aria-hidden="true">☁</span> Pausa</button>
          <button type="button" className="game-chip is-icon" onClick={() => update({ soundOn: !soundOn })} aria-pressed={soundOn} aria-label={soundOn ? 'Desligar o som' : 'Ligar o som'}>
            <span aria-hidden="true">{soundOn ? '🔊' : '🔇'}</span>
          </button>
        </div>
      </div>

      <header className="game-heading">
        <span className="section-eyebrow">{activity.title.toUpperCase()} · {level.year}º ANO · FASE {level.level}</span>
        <h2 id="game-title">{level.title}</h2>
        <p>{level.instruction}</p>
      </header>

      <div className="game-stage" key={exercise.id}>
        <Exercise ex={exercise} level={level} report={report} />
      </div>

      <div className={`game-feedback ${message ? `is-${message.kind}` : ''}`} role="status" aria-live="polite">
        {message && <><span className="feedback-icon" aria-hidden="true">{message.kind === 'ok' ? '✓' : message.kind === 'hint' ? '✦' : '↺'}</span><span>{message.text}</span></>}
      </div>

      <div className="game-actions">
        {solved && (
          <button type="button" className="game-button" ref={nextButton} onClick={goNext}>
            {index === exercises.length - 1 ? 'Ver resultado' : 'Próximo'} <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {paused && <BreakOverlay onClose={() => setPaused(false)} />}
    </section>
  )
}
