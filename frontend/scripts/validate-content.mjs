// Verifica a integridade do conteúdo: cada exercício precisa ter exatamente uma resposta correta.
import { ACTIVITIES, YEARS, LEVELS_PER_YEAR } from '../src/content/index.js'
let errors = 0, exercises = 0
const fail = (m) => { errors++; console.error('✗', m) }
const ids = new Set()
for (const a of ACTIVITIES) {
  for (const y of YEARS) {
    const lv = a.levels.filter((l) => l.year === y)
    if (lv.length !== LEVELS_PER_YEAR) fail(`${a.slug} ano ${y}: ${lv.length} níveis`)
  }
  for (const l of a.levels) for (const e of l.exercises) {
    exercises++
    if (ids.has(e.id)) fail(`id repetido ${e.id}`); ids.add(e.id)
    if (e.options) {
      const vals = e.options.map((o) => (typeof o === 'string' ? o : o.value))
      if (new Set(vals).size !== vals.length) fail(`${e.id}: opções repetidas`)
      if (vals.filter((v) => v === e.answer).length !== 1) fail(`${e.id}: resposta "${e.answer}" não está exatamente 1x nas opções`)
    }
    if (e.type === 'sort') {
      const cats = new Set(e.categories.map((c) => c.id))
      for (const i of e.items) if (!cats.has(i.cat)) fail(`${e.id}: item ${i.id} com categoria inválida`)
      for (const c of e.categories) if (!e.items.some((i) => i.cat === c.id)) fail(`${e.id}: categoria ${c.id} vazia`)
    }
    if (e.type === 'routine' && e.cards.length < 3) fail(`${e.id}: poucos cartões`)
    if (e.type === 'routine' && new Set(e.cards.map((c) => c.id)).size !== e.cards.length) fail(`${e.id}: cartões repetidos`)
    if (e.type === 'count' && e.options.filter((o) => o === String(e.total)).length !== 1) fail(`${e.id}: contagem`)
    if (e.type === 'sequence' && e.seq && e.seq.filter((v) => v === null).length !== 1) fail(`${e.id}: sequência precisa de 1 lacuna`)
    if (e.type === 'syllable' && e.syllables[0] !== e.answer) fail(`${e.id}: sílaba inicial`)
    if (e.type === 'countsyl' && String(e.syllables.length) !== e.answer) fail(`${e.id}: nº de sílabas`)
    if (e.type === 'subst') {
      const expect = e.word.replace(e.from, e.to)
      if (expect !== e.answer) fail(`${e.id}: ${e.word} com ${e.from}→${e.to} = ${expect}, mas resposta é ${e.answer}`)
    }
    if (e.type === 'complete') {
      const joined = e.parts.map((p) => p ?? e.answer).join('')
      if (joined !== e.word) fail(`${e.id}: partes montam ${joined}, esperado ${e.word}`)
    }
    if (e.type === 'initial' && e.word[0] !== e.answer) fail(`${e.id}: letra inicial`)
    if (e.type === 'samesound' && e.answer.slice(0, 2) !== e.word.slice(0, 2)) fail(`${e.id}: ${e.answer} não começa com a mesma sílaba de ${e.word}`)
    if (e.type === 'samesound' && e.options.some((o) => o.value !== e.answer && o.value.slice(0, 2) === e.word.slice(0, 2))) fail(`${e.id}: distrator também começa igual`)
  }
}
console.log(`${ACTIVITIES.length} atividades, ${exercises} exercícios, ${errors} erro(s)`)
process.exit(errors ? 1 : 0)
