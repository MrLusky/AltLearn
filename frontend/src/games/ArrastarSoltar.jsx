import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Prompt, Shape, seededShuffle } from './ui.jsx'
import useDragDrop from '../useDragDrop.js'
import { useSound } from '../sound.js'

function ItemFace({ item }) {
  return item.shape
    ? <Shape shape={item.shape} color={item.color} />
    : <span className="tile-emoji" aria-hidden="true">{item.emoji}</span>
}

export default function ArrastarSoltar({ ex, report }) {
  const sound = useSound()
  const order = useMemo(() => seededShuffle(ex.items, ex.id), [ex])
  const [placed, setPlaced] = useState({})          // itemId -> categoryId
  const [selected, setSelected] = useState(null)
  const [mistakes, setMistakes] = useState({})      // itemId -> nº de tentativas erradas
  const [bounce, setBounce] = useState(null)

  const byId = Object.fromEntries(ex.items.map((i) => [i.id, i]))
  const remaining = order.filter((i) => !placed[i.id])

  function place(itemId, catId) {
    const item = byId[itemId]
    if (!item || placed[itemId]) return
    const correct = item.cat === catId
    report.answer(correct, `${itemId}->${catId}`)
    if (correct) {
      const next = { ...placed, [itemId]: catId }
      setPlaced(next)
      setSelected(null)
      if (Object.keys(next).length === ex.items.length) report.complete()
      return
    }
    const count = (mistakes[itemId] || 0) + 1
    setMistakes({ ...mistakes, [itemId]: count })
    if (count === 2) report.hint()
    setBounce(itemId)
    setTimeout(() => setBounce(null), 450)
  }

  function onTap(itemId) {
    if (placed[itemId]) return
    setSelected((current) => (current === itemId ? null : itemId))
    sound.speak(byId[itemId].label)
    sound.pop()
  }

  const { bind, ghost, over } = useDragDrop({ onDrop: place, onTap })

  // A mesma dica vale para toque e arraste: o item "em mãos" (selecionado ou sendo arrastado)
  // faz o grupo certo brilhar depois de 2 tentativas erradas.
  const active = ghost?.id ?? selected
  const hinted = active && (mistakes[active] || 0) >= 2 ? active : remaining.find((i) => (mistakes[i.id] || 0) >= 2)?.id
  const hintCat = hinted ? byId[hinted].cat : null
  const holding = Boolean(active)

  return (
    <div className="game-exercise">
      <Prompt text={ex.prompt} />
      <p className="game-hint-text">Arraste a figura até o grupo. Ou toque na figura e depois no grupo.</p>

      <div className="drop-zones" style={{ '--cols': ex.categories.length }}>
        {ex.categories.map((cat) => {
          const inside = ex.items.filter((i) => placed[i.id] === cat.id)
          return (
            <button key={cat.id} type="button" data-drop={cat.id}
              className={`drop-zone ${over === cat.id ? 'is-over' : ''} ${hintCat === cat.id ? 'is-hint' : ''} ${holding ? 'is-ready' : ''}`}
              onClick={() => selected && place(selected, cat.id)} aria-label={`Grupo ${cat.label}${selected ? '. Toque para colocar aqui' : ''}`}>
              <span className="drop-zone-title"><span aria-hidden="true">{cat.emoji}</span> {cat.label}</span>
              <span className="drop-zone-items">
                {inside.map((item) => <span key={item.id} className="tile is-placed" aria-label={item.label}><ItemFace item={item} /></span>)}
              </span>
            </button>
          )
        })}
      </div>

      <div className="tray" role="group" aria-label="Figuras para guardar">
        {remaining.map((item) => (
          <button key={item.id} type="button" {...bind(item.id)}
            className={`tile ${selected === item.id ? 'is-selected' : ''} ${bounce === item.id ? 'is-bounce' : ''} ${ghost?.id === item.id ? 'is-dragging' : ''}`}
            aria-pressed={selected === item.id} aria-label={item.label}>
            <ItemFace item={item} />
          </button>
        ))}
        {remaining.length === 0 && <span className="tray-empty">Tudo guardado!</span>}
      </div>

      {ghost && createPortal(
        <div className="drag-ghost" style={{ left: ghost.x, top: ghost.y, width: ghost.w, height: ghost.h }}><div className="tile"><ItemFace item={byId[ghost.id]} /></div></div>,
        document.body,
      )}
    </div>
  )
}
