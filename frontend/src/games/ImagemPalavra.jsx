import { useEffect } from 'react'
import { AudioNeeded, BigPicture, OptionButton, Prompt, SpeakButton } from './ui.jsx'
import useChoices from './useChoices.js'
import { useSound } from '../sound.js'

const PROMPTS = {
  img2word: 'Qual palavra combina com a figura?',
  audio2word: 'Ouça e escolha a palavra escrita.',
  word2img: 'Qual figura combina com a palavra?',
  complete: 'Qual sílaba completa a palavra?',
}

export default function ImagemPalavra({ ex, report }) {
  const sound = useSound()
  const choices = useChoices({ answer: ex.answer, report, onCorrect: () => sound.speak(ex.word) })
  const audioOnly = ex.type === 'audio2word' && !ex.emoji

  useEffect(() => {
    if (ex.type === 'audio2word') sound.speak(ex.word)
    // fala uma vez ao abrir o exercício
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="game-exercise">
      <Prompt text={PROMPTS[ex.type]} />
      <AudioNeeded needed={audioOnly} />

      {ex.type === 'img2word' && <BigPicture emoji={ex.emoji} label="figura" />}

      {ex.type === 'audio2word' && (
        <div className="stage-row">
          {ex.emoji && <BigPicture emoji={ex.emoji} label="figura" />}
          <SpeakButton text={ex.word} label="Ouvir a palavra" />
        </div>
      )}

      {ex.type === 'word2img' && (
        <div className="stage-row">
          <div className="big-word" aria-label={`Palavra ${ex.word}`}>{ex.word}</div>
          <SpeakButton text={ex.word} />
        </div>
      )}

      {ex.type === 'complete' && (
        <>
          <BigPicture emoji={ex.emoji} label="figura" />
          <div className="syllable-row" aria-label={`Palavra com sílaba faltando: ${ex.word}`}>
            {ex.parts.map((part, i) => (
              <span key={i} className={part === null ? `syllable is-blank ${choices.solved ? 'is-filled' : ''}` : 'syllable'}>
                {part === null ? (choices.solved ? ex.answer : '?') : part}
              </span>
            ))}
          </div>
        </>
      )}

      <div className={`option-grid ${ex.type === 'word2img' ? 'is-pictures' : ''}`} role="group" aria-label="Respostas">
        {ex.options.map((opt) => (
          <OptionButton key={opt.value} state={choices.stateOf(opt.value)} onClick={() => choices.choose(opt.value)}
            className={opt.emoji ? 'is-picture' : 'is-word'} ariaLabel={opt.emoji ? opt.label : undefined}>
            {opt.emoji ? <span className="option-emoji" aria-hidden="true">{opt.emoji}</span> : <span className="option-text">{opt.text}</span>}
          </OptionButton>
        ))}
      </div>
    </div>
  )
}
