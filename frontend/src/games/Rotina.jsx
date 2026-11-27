import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Prompt, seededShuffle } from './ui.jsx'
import useDragDrop from '../useDragDrop.js'
import { useSound } from '../sound.js'

export default function Rotina({ ex, report }) {
  const sound = useSound()
  const tray = useMemo(() => {
    const shuffled = seededShuffle(ex.cards, ex.id)
    // garante que a ordem inicial não seja a resposta
    return shuffled.every((c, i) => c.id === ex.cards[i].id) ? [...shuffled.slice(1), shuffled[0]] : shuffled
  }, [ex])
  const [slots, setSlots] = useState(() => ex.cards.map(() => null)) // posição → id do cartão
  const [selected, setSelected] = useState(null)
  const [mistakes, setMistakes] = useState({})
  const [bounce, setBounce] = useState(null)

  const byId = Object.fromEntries(ex.cards.map((c) => [c.id, c]))
  const placedIds = new Set(slots.filter(Boolean))
  const remaining = tray.filter((c) => !placedIds.has(c.id))
  const correctIndex = (id) => ex.cards.findIndex((c) => c.id === id)

  function place(cardId, target) {
    const index = Number(target)
    if (!byId[cardId] || placedIds.has(cardId) || slots[index]) return
    const correct = correctIndex(cardId) === index
    report.answer(correct, `${cardId}->${index + 1}`)
    if (correct) {
      const next = [...slots]
      next[index] = cardId
      setSlots(next)
      setSelected(null)
      if (next.every(Boolean)) report.complete()
      return
    }
    const count = (mistakes[cardId] || 0) + 1
    setMistakes({ ...mistakes, [cardId]: count })
    if (count === 2) report.hint()
    setBounce(cardId)
    setTimeout(() => setBounce(null), 450)
  }

  function onTap(cardId) {
    if (placedIds.has(cardId)) return
    setSelected((current) => (current === cardId ? null : cardId))
    sound.speak(byId[cardId].label)
  }

  const { bind, ghost, over } = useDragDrop({ onDrop: place, onTap })

  const active = ghost?.id ?? selected
  const hinted = active && (mistakes[active] || 0) >= 2 ? active : remaining.find((c) => (mistakes[c.id] || 0) >= 2)?.id
  const hintSlot = hinted ? correctIndex(hinted) : null
  const holding = Boolean(active)

  const Card = ({ card, small }) => (
    <span className={`routine-card ${small ? 'is-small' : ''}`}>
      <span className="routine-emoji" aria-hidden="true">{card.emoji}</span>
      <span className="routine-label">{card.label}</span>
    </span>
  )

  return (
    <div className="game-exercise">
      <Prompt text={`${ex.title}: o que vem primeiro?`} />
      <p className="game-hint-text">Arraste cada cartão para o número certo. Ou toque no cartão e depois no número.</p>

      <ol className="routine-slots" style={{ '--n': ex.cards.length }}>
        {slots.map((cardId, i) => (
          <li key={i}>
            <button type="button" data-drop={i} onClick={() => selected && place(selected, i)}
              className={`routine-slot ${cardId ? 'is-filled' : ''} ${over === String(i) ? 'is-over' : ''} ${hintSlot === i ? 'is-hint' : ''} ${holding && !cardId ? 'is-ready' : ''}`}
              aria-label={cardId ? `Passo ${i + 1}: ${byId[cardId].label}` : `Passo ${i + 1}, vazio${selected ? '. Toque para colocar aqui' : ''}`}>
              <span className="slot-number" aria-hidden="true">{i + 1}</span>
              {cardId ? <Card card={byId[cardId]} small /> : <span className="slot-empty" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>

      <div className="tray is-cards" role="group" aria-label="Cartões para ordenar">
        {remaining.map((card) => (
          <button key={card.id} type="button" {...bind(card.id)}
            className={`tile is-card ${selected === card.id ? 'is-selected' : ''} ${bounce === card.id ? 'is-bounce' : ''} ${ghost?.id === card.id ? 'is-dragging' : ''}`}
            aria-pressed={selected === card.id}>
            <Card card={card} />
          </button>
        ))}
        {remaining.length === 0 && <span className="tray-empty">Todos os cartões estão no lugar!</span>}
      </div>

      {ghost && createPortal(
        <div className="drag-ghost" style={{ left: ghost.x, top: ghost.y, width: ghost.w, height: ghost.h }}><div className="tile is-card"><Card card={byId[ghost.id]} /></div></div>,
        document.body,
      )}
    </div>
  )
}
