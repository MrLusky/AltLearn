import { useCallback, useEffect, useRef, useState } from 'react'

// Arrastar e soltar com Pointer Events (mouse, toque e caneta) + toque simples + teclado.
//  - toque/clique sem mover  → onTap(id)  (a tela decide: selecionar o item ou colocá-lo direto)
//  - arrastar e soltar        → onDrop(id, alvo)  — alvos são elementos com data-drop="<alvo>"
//  - teclado (Enter/Espaço)   → onTap(id)
export default function useDragDrop({ onDrop, onTap, disabled = false }) {
  const [ghost, setGhost] = useState(null)
  const [over, setOver] = useState(null)
  const handlers = useRef({ onDrop, onTap })
  useEffect(() => { handlers.current = { onDrop, onTap } })

  const targetAt = (x, y) => document.elementFromPoint(x, y)?.closest?.('[data-drop]')?.getAttribute('data-drop') ?? null

  const start = useCallback((event, id) => {
    if (disabled) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    const drag = { id, sx: event.clientX, sy: event.clientY, moved: false, w: rect.width, h: rect.height, ox: event.clientX - rect.left, oy: event.clientY - rect.top, pid: event.pointerId }

    const move = (ev) => {
      if (ev.pointerId !== drag.pid) return
      if (!drag.moved && Math.hypot(ev.clientX - drag.sx, ev.clientY - drag.sy) < 8) return
      drag.moved = true
      setGhost({ id, x: ev.clientX - drag.ox, y: ev.clientY - drag.oy, w: drag.w, h: drag.h })
      setOver(targetAt(ev.clientX, ev.clientY))
    }
    const finish = (ev, cancelled) => {
      if (ev.pointerId !== drag.pid) return
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', cancel)
      setGhost(null)
      setOver(null)
      if (cancelled) return
      if (drag.moved) {
        const target = targetAt(ev.clientX, ev.clientY)
        if (target !== null) handlers.current.onDrop?.(id, target)
      } else {
        handlers.current.onTap?.(id)
      }
    }
    const up = (ev) => finish(ev, false)
    const cancel = (ev) => finish(ev, true)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', cancel)
  }, [disabled])

  // Props para o item arrastável.
  const bind = (id) => ({
    onPointerDown: (event) => start(event, id),
    onClick: (event) => { if (event.detail === 0 && !disabled) handlers.current.onTap?.(id) }, // teclado
    style: { touchAction: 'none' },
  })

  return { bind, ghost, over }
}
