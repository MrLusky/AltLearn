import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Group, OptionButton, Prompt } from './ui.jsx'
import useChoices from './useChoices.js'
import useDragDrop from '../useDragDrop.js'
import { useSound } from '../sound.js'

const NUMBER_WORDS = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte']

function NumberOptions({ ex, choices }) {
  return (
    <div className="option-grid is-numbers" role="group" aria-label="Números para escolher">
      {ex.options.map((value) => (
        <OptionButton key={value} state={choices.stateOf(value)} onClick={() => choices.choose(value)} className="is-number" ariaLabel={`Número ${value}`}>
          {value}
        </OptionButton>
      ))}
    </div>
  )
}

// Contar tocando: cada toque numera um objeto e diz o número em voz alta (correspondência um a um).
function CountExercise({ ex, report }) {
  const sound = useSound()
  const choices = useChoices({ answer: ex.answer, report })
  const [counted, setCounted] = useState([])
  function tap(i) {
    if (counted.includes(i)) return
    const next = [...counted, i]
    setCounted(next)
    sound.speak(NUMBER_WORDS[next.length] ?? String(next.length), 1)
    sound.pop()
  }
  return (
    <div className="game-exercise">
      <Prompt text={`Quantos ${ex.noun} tem?`} />
      <p className="game-hint-text">Toque em cada desenho para contar.</p>
      <div className="object-group is-countable" role="group" aria-label={`${ex.total} ${ex.noun}`}>
        {Array.from({ length: ex.total }, (_, i) => (
          <button type="button" key={i} className={`object ${counted.includes(i) ? 'is-counted' : ''}`} onClick={() => tap(i)} aria-label={`${ex.noun}, número ${i + 1}`}>
            <span aria-hidden="true">{ex.emoji}</span>
            {counted.includes(i) && <span className="object-count" aria-hidden="true">{counted.indexOf(i) + 1}</span>}
          </button>
        ))}
      </div>
      <NumberOptions ex={ex} choices={choices} />
    </div>
  )
}

// Sequência com número faltando: toque no número (vai direto para o espaço) ou arraste até lá.
function NumSeqExercise({ ex, report }) {
  const choices = useChoices({ answer: ex.answer, report })
  const { bind, ghost, over } = useDragDrop({ onDrop: (value) => choices.choose(value), onTap: (value) => choices.choose(value), disabled: choices.solved })
  return (
    <div className="game-exercise">
      <Prompt text="Qual número falta?" />
      <div className="number-seq" aria-label="Sequência numérica">
        {ex.seq.map((value, i) => value === null
          ? <span key={i} data-drop="gap" className={`seq-cell is-gap ${over === 'gap' ? 'is-over' : ''} ${choices.solved ? 'is-filled' : ''}`} aria-label="Espaço vazio">{choices.solved ? ex.answer : '?'}</span>
          : <span key={i} className="seq-cell">{value}</span>)}
      </div>
      <p className="game-hint-text">Toque no número certo ou arraste até o espaço vazio.</p>
      <div className="option-grid is-numbers" role="group" aria-label="Números para escolher">
        {ex.options.map((value) => (
          <OptionButton key={value} state={choices.stateOf(value)} className={`is-number ${ghost?.id === value ? 'is-dragging' : ''}`} ariaLabel={`Número ${value}`} {...bind(value)}>
            {value}
          </OptionButton>
        ))}
      </div>
      {ghost && createPortal(<div className="drag-ghost" style={{ left: ghost.x, top: ghost.y, width: ghost.w, height: ghost.h }}><div className="game-option is-number">{ghost.id}</div></div>, document.body)}
    </div>
  )
}

function CompareExercise({ ex, report }) {
  const choices = useChoices({ answer: ex.answer, report })
  return (
    <div className="game-exercise">
      <Prompt text={`Qual grupo tem ${ex.ask.toUpperCase()}?`} />
      <div className="compare-row" role="group" aria-label="Grupos para comparar">
        {[['a', ex.a], ['b', ex.b]].map(([key, n]) => (
          <OptionButton key={key} state={choices.stateOf(key)} onClick={() => choices.choose(key)} className="compare-option" ariaLabel={`Grupo ${key === 'a' ? 'da esquerda' : 'da direita'}`}>
            <Group emoji={ex.emoji} count={n} label={`${n} objetos`} />
          </OptionButton>
        ))}
      </div>
      <p className="game-hint-text">Conte os dois grupos com calma. Depois toque no grupo que tem {ex.ask}.</p>
    </div>
  )
}

function OperationExercise({ ex, report }) {
  const choices = useChoices({ answer: ex.answer, report })
  const isAdd = ex.type === 'add'
  return (
    <div className="game-exercise">
      <Prompt text={isAdd ? 'Junte os dois grupos. Quantos ficam?' : `Tinha ${ex.total}. Os riscados saíram. Quantos ficam?`} />
      <div className="operation-row" aria-label={isAdd ? `${ex.a} mais ${ex.b}` : `${ex.total} menos ${ex.take}`}>
        {isAdd ? (
          <>
            <Group emoji={ex.emoji} count={ex.a} label={`${ex.a} objetos`} />
            <span className="op-sign" aria-hidden="true">+</span>
            <Group emoji={ex.emoji} count={ex.b} label={`${ex.b} objetos`} />
          </>
        ) : (
          <Group emoji={ex.emoji} count={ex.total} crossed={ex.take} label={`${ex.total} objetos, ${ex.take} riscados`} />
        )}
        <span className="op-sign" aria-hidden="true">=</span>
        <span className={`seq-cell is-gap ${choices.solved ? 'is-filled' : ''}`}>{choices.solved ? ex.answer : '?'}</span>
      </div>
      <NumberOptions ex={ex} choices={choices} />
    </div>
  )
}

function PatternExercise({ ex, report }) {
  const choices = useChoices({ answer: ex.answer, report })
  return (
    <div className="game-exercise">
      <Prompt text="Qual vem depois? Descubra o padrão." />
      <div className="number-seq is-pattern" aria-label="Padrão">
        {ex.seq.map((value, i) => value === null
          ? <span key={i} className={`seq-cell is-gap ${choices.solved ? 'is-filled' : ''}`} aria-label="Espaço vazio">{choices.solved ? ex.answer : '?'}</span>
          : <span key={i} className="seq-cell"><span aria-hidden="true">{value}</span></span>)}
      </div>
      <div className="option-grid is-numbers" role="group" aria-label="Opções">
        {ex.options.map((value) => (
          <OptionButton key={value} state={choices.stateOf(value)} onClick={() => choices.choose(value)} className="is-number" ariaLabel={`Opção ${value}`}>
            <span aria-hidden="true">{value}</span>
          </OptionButton>
        ))}
      </div>
    </div>
  )
}

const BY_TYPE = { count: CountExercise, sequence: NumSeqExercise, compare: CompareExercise, add: OperationExercise, sub: OperationExercise, pattern: PatternExercise }

export default function MatematicaVisual(props) {
  const Component = BY_TYPE[props.ex.type]
  return <Component {...props} />
}
