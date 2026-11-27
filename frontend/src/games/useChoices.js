import { useState } from 'react'

// Lógica comum das atividades de múltipla escolha, com "aprendizagem sem erro":
// escolha errada só esmaece a opção (sem punição) e, após 2 tentativas erradas, a resposta certa ganha destaque.
export default function useChoices({ answer, report, onCorrect }) {
  const [wrong, setWrong] = useState([])
  const [picked, setPicked] = useState(null)
  const [hintShown, setHintShown] = useState(false)
  const solved = picked !== null

  function choose(value) {
    if (solved || wrong.includes(value)) return
    const correct = value === answer
    report.answer(correct, String(value))
    if (correct) {
      setPicked(value)
      onCorrect?.()
      report.complete()
      return
    }
    const nextWrong = [...wrong, value]
    setWrong(nextWrong)
    if (nextWrong.length >= 2 && !hintShown) { setHintShown(true); report.hint() }
  }

  const stateOf = (value) => ({
    wrong: wrong.includes(value),
    correct: solved && value === answer,
    hint: hintShown && !solved && value === answer,
  })

  return { choose, stateOf, solved, picked, wrong }
}
