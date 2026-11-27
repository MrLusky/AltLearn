import { useEffect, useState } from 'react'
import { BigPicture, OptionButton, Prompt, SpeakButton } from './ui.jsx'
import useChoices from './useChoices.js'
import { useSound } from '../sound.js'

// O que a voz diz ao abrir o exercício (e ao tocar em "Ouvir de novo").
function spokenPrompt(ex) {
  switch (ex.type) {
    case 'letter': return `Encontre a letra ${ex.letter}`
    case 'initial': return `Com qual letra começa ${ex.word}?`
    case 'samesound': return `Qual figura começa com a mesma sílaba de ${ex.word}?`
    case 'syllable': return `Com qual sílaba começa ${ex.word}?`
    case 'countsyl': return `Quantas sílabas tem ${ex.word}?`
    case 'subst': return `Em ${ex.word}, troque ${ex.from} por ${ex.to}. Que palavra nasceu?`
    default: return ex.word
  }
}

// O que a voz diz ao acertar (reforço da resposta certa, nunca da pergunta).
function spokenReward(ex) {
  switch (ex.type) {
    case 'letter': return `Letra ${ex.letter}`
    case 'initial': return `${ex.word} começa com ${ex.answer}`
    case 'samesound': return `${ex.word} e ${ex.answer} começam igual`
    case 'subst': return ex.answer
    case 'countsyl': return ex.syllables.join(', ')
    default: return ex.word
  }
}

export default function CacaSons({ ex, report }) {
  const sound = useSound()
  const choices = useChoices({ answer: ex.answer, report, onCorrect: () => sound.speak(spokenReward(ex)) })
  const [claps, setClaps] = useState(0) // quantas palmas já foram dadas (revela uma sílaba por palma)
  const prompt = spokenPrompt(ex)

  useEffect(() => {
    sound.speak(prompt)
    // fala uma vez ao abrir o exercício
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function clap() {
    if (claps >= ex.syllables.length) { setClaps(1); sound.tick(); return } // recomeça a contagem
    setClaps(claps + 1)
    sound.tick()
  }

  const promptText = {
    letter: <>Encontre a letra <span className="blank-letter" aria-label="letra escondida">___</span></>,
    initial: `Com qual letra começa ${ex.word}?`,
    samesound: `Qual figura começa com a mesma sílaba de ${ex.word}?`,
    syllable: `Com qual sílaba começa ${ex.word}?`,
    countsyl: `Quantas sílabas tem ${ex.word}?`,
    subst: `Em ${ex.word}, troque ${ex.from} por ${ex.to}. Que palavra nasceu?`,
  }[ex.type]

  const pictureOptions = ex.type === 'samesound' || ex.type === 'subst'

  return (
    <div className="game-exercise">
      <Prompt text={promptText} speakText={prompt} />

      {ex.emoji && ex.type !== 'subst' && <BigPicture emoji={ex.emoji} label={ex.word} />}
      {ex.type === 'samesound' && (
        <div className="big-word is-small" aria-label={`Palavra ${ex.word}`}>
          <mark className="syl-mark">{ex.hl}</mark>{ex.word.slice(ex.hl.length)}
        </div>
      )}

      {ex.type === 'syllable' && (
        <div className="syllable-row" aria-label={`Palavra ${ex.word} em sílabas`}>
          {ex.syllables.map((s, i) => <span key={i} className={choices.solved && i === 0 ? 'syllable is-filled' : 'syllable'}>{choices.solved || i > 0 ? s : '?'}</span>)}
        </div>
      )}

      {ex.type === 'countsyl' && (
        <div className="clap-area">
          <button type="button" className="game-button" onClick={clap}>
            <span aria-hidden="true">👏</span> {claps === 0 ? 'Bater palmas' : claps >= ex.syllables.length ? 'Bater de novo' : 'Mais uma palma'}
          </button>
          <div className="syllable-row clap-row" aria-live="polite" aria-label="Sílabas reveladas a cada palma">
            {ex.syllables.map((s, i) => (
              (choices.solved || i < claps) && <span key={i} className={`syllable ${i === claps - 1 && !choices.solved ? 'is-clap' : ''}`}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {ex.type === 'subst' && (
        <div className="subst-row" aria-label={`${ex.word}: ${ex.from} vira ${ex.to}`}>
          <span className="big-word">{ex.word}</span>
          <span className="subst-arrow" aria-hidden="true">{ex.from} → {ex.to}</span>
          <span className="big-word is-blank">{choices.solved ? ex.answer : '?'}</span>
        </div>
      )}

      <div className={`option-grid ${pictureOptions ? 'is-pictures' : 'is-letters'}`} role="group" aria-label="Respostas">
        {ex.options.map((opt) => (
          <OptionButton key={opt.value} state={choices.stateOf(opt.value)} onClick={() => choices.choose(opt.value)}
            className={opt.emoji ? 'is-picture' : 'is-letter'} ariaLabel={opt.emoji ? opt.label : `Letra ${opt.text}`}>
            {opt.emoji
              ? <><span className="option-emoji" aria-hidden="true">{opt.emoji}</span><span className="option-caption">{opt.label}</span></>
              : <span className="option-text">{opt.text}</span>}
          </OptionButton>
        ))}
      </div>
      {ex.type === 'letter' && <p className="game-hint-text">Dica: toque em <SpeakButton text={prompt} compact label="Ouvir" /> para ouvir qual é a letra.</p>}
    </div>
  )
}
