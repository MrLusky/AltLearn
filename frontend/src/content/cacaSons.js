// Atividade 5 — Caça aos Sons (consciência fonológica)
// Tipos: letter, initial, samesound, syllable, countsyl, subst.
const L = (v) => ({ value: v, text: v })
const P = (emoji, label) => ({ value: label, emoji, label })

export default {
  slug: 'caca-sons',
  levels: [
    {
      year: 1, level: 1, title: 'Encontre a letra',
      instruction: 'Ouça e encontre a letra certa.',
      exercises: [
        { id: 'cs-1-1-1', type: 'letter', letter: 'B', options: ['B', 'M', 'S', 'L'].map(L), answer: 'B' },
        { id: 'cs-1-1-2', type: 'letter', letter: 'M', options: ['P', 'M', 'T', 'A'].map(L), answer: 'M' },
        { id: 'cs-1-1-3', type: 'letter', letter: 'S', options: ['S', 'O', 'V', 'D'].map(L), answer: 'S' },
        { id: 'cs-1-1-4', type: 'letter', letter: 'L', options: ['C', 'L', 'U', 'F'].map(L), answer: 'L' },
        { id: 'cs-1-1-5', type: 'letter', letter: 'P', options: ['G', 'N', 'P', 'E'].map(L), answer: 'P' },
      ],
    },
    {
      year: 1, level: 2, title: 'Com que letra começa?',
      instruction: 'Ouça a palavra. Com qual letra ela começa?',
      exercises: [
        { id: 'cs-1-2-1', type: 'initial', emoji: '⚽', word: 'BOLA', options: ['B', 'M', 'S'].map(L), answer: 'B' },
        { id: 'cs-1-2-2', type: 'initial', emoji: '🐸', word: 'SAPO', options: ['P', 'S', 'L'].map(L), answer: 'S' },
        { id: 'cs-1-2-3', type: 'initial', emoji: '🌙', word: 'LUA', options: ['L', 'C', 'T'].map(L), answer: 'L' },
        { id: 'cs-1-2-4', type: 'initial', emoji: '🧳', word: 'MALA', options: ['N', 'B', 'M'].map(L), answer: 'M' },
        { id: 'cs-1-2-5', type: 'initial', emoji: '🦆', word: 'PATO', options: ['P', 'G', 'D'].map(L), answer: 'P' },
      ],
    },
    {
      year: 1, level: 3, title: 'Começa igual',
      instruction: 'Ouça a palavra. Qual figura começa com a mesma sílaba (o mesmo pedacinho)?',
      exercises: [
        { id: 'cs-1-3-1', type: 'samesound', emoji: '⚽', word: 'BOLA', hl: 'BO', options: [P('🎂', 'BOLO'), P('🐸', 'SAPO'), P('🌙', 'LUA')], answer: 'BOLO' },
        { id: 'cs-1-3-2', type: 'samesound', emoji: '🐱', word: 'GATO', hl: 'GA', options: [P('🦆', 'PATO'), P('🐓', 'GALO'), P('🏠', 'CASA')], answer: 'GALO' },
        { id: 'cs-1-3-3', type: 'samesound', emoji: '🐸', word: 'SAPO', hl: 'SA', options: [P('👟', 'SAPATO'), P('🌙', 'LUA'), P('🎂', 'BOLO')], answer: 'SAPATO' },
        { id: 'cs-1-3-4', type: 'samesound', emoji: '🌙', word: 'LUA', hl: 'LU', options: [P('🧳', 'MALA'), P('🧤', 'LUVA'), P('🐄', 'VACA')], answer: 'LUVA' },
        { id: 'cs-1-3-5', type: 'samesound', emoji: '🧳', word: 'MALA', hl: 'MA', options: [P('🐄', 'VACA'), P('🐱', 'GATO'), P('🐵', 'MACACO')], answer: 'MACACO' },
      ],
    },
    {
      year: 2, level: 1, title: 'Sílaba inicial',
      instruction: 'Ouça a palavra. Qual sílaba vem primeiro?',
      exercises: [
        { id: 'cs-2-1-1', type: 'syllable', emoji: '🐴', word: 'CAVALO', syllables: ['CA', 'VA', 'LO'], options: ['CA', 'PA', 'LA'].map(L), answer: 'CA' },
        { id: 'cs-2-1-2', type: 'syllable', emoji: '🪟', word: 'JANELA', syllables: ['JA', 'NE', 'LA'], options: ['NE', 'JA', 'LA'].map(L), answer: 'JA' },
        { id: 'cs-2-1-3', type: 'syllable', emoji: '🪆', word: 'BONECA', syllables: ['BO', 'NE', 'CA'], options: ['CA', 'NE', 'BO'].map(L), answer: 'BO' },
        { id: 'cs-2-1-4', type: 'syllable', emoji: '🐵', word: 'MACACO', syllables: ['MA', 'CA', 'CO'], options: ['MA', 'CA', 'CO'].map(L), answer: 'MA' },
        { id: 'cs-2-1-5', type: 'syllable', emoji: '👟', word: 'SAPATO', syllables: ['SA', 'PA', 'TO'], options: ['TO', 'SA', 'PA'].map(L), answer: 'SA' },
      ],
    },
    {
      year: 2, level: 2, title: 'Palminhas das sílabas',
      instruction: 'Bata palmas na palavra. Quantas sílabas ela tem?',
      exercises: [
        { id: 'cs-2-2-1', type: 'countsyl', emoji: '☀️', word: 'SOL', syllables: ['SOL'], options: ['1', '2', '3'].map(L), answer: '1' },
        { id: 'cs-2-2-2', type: 'countsyl', emoji: '🐱', word: 'GATO', syllables: ['GA', 'TO'], options: ['1', '2', '3'].map(L), answer: '2' },
        { id: 'cs-2-2-3', type: 'countsyl', emoji: '👟', word: 'SAPATO', syllables: ['SA', 'PA', 'TO'], options: ['2', '3', '4'].map(L), answer: '3' },
        { id: 'cs-2-2-4', type: 'countsyl', emoji: '🦋', word: 'BORBOLETA', syllables: ['BOR', 'BO', 'LE', 'TA'], options: ['3', '4', '5'].map(L), answer: '4' },
        { id: 'cs-2-2-5', type: 'countsyl', emoji: '🪟', word: 'JANELA', syllables: ['JA', 'NE', 'LA'], options: ['2', '3', '4'].map(L), answer: '3' },
      ],
    },
    {
      year: 2, level: 3, title: 'Troque a sílaba',
      instruction: 'Troque um pedacinho da palavra e descubra a nova palavra.',
      exercises: [
        { id: 'cs-2-3-1', type: 'subst', word: 'GATO', from: 'GA', to: 'RA', options: [P('🐭', 'RATO'), P('🦆', 'PATO'), P('🐸', 'SAPO')], answer: 'RATO' },
        { id: 'cs-2-3-2', type: 'subst', word: 'PATO', from: 'PA', to: 'GA', options: [P('🐱', 'GATO'), P('🐭', 'RATO'), P('🐸', 'SAPO')], answer: 'GATO' },
        { id: 'cs-2-3-3', type: 'subst', word: 'MALA', from: 'MA', to: 'BA', options: [P('⚽', 'BOLA'), P('🍬', 'BALA'), P('🐄', 'VACA')], answer: 'BALA' },
        { id: 'cs-2-3-4', type: 'subst', word: 'FOGO', from: 'FO', to: 'JO', options: [P('🎮', 'JOGO'), P('🔥', 'FOGO'), P('🌙', 'LUA')], answer: 'JOGO' },
      ],
    },
  ],
}
