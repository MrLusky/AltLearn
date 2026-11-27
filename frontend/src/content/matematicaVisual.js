// Atividade 4 — Matemática Visual
// Tipos: count, sequence, compare, add, sub, pattern.
const n = (...v) => v.map(String)
const count = (id, emoji, noun, total, options) => ({ id, type: 'count', emoji, noun, total, options: n(...options), answer: String(total) })
const seq = (id, seq, answer, options) => ({ id, type: 'sequence', seq: seq.map((v) => (v === null ? null : String(v))), options: n(...options), answer: String(answer) })
const add = (id, emoji, a, b, options) => ({ id, type: 'add', emoji, a, b, options: n(...options), answer: String(a + b) })
const sub = (id, emoji, total, take, options) => ({ id, type: 'sub', emoji, total, take, options: n(...options), answer: String(total - take) })
const cmp = (id, emoji, a, b, ask) => ({ id, type: 'compare', emoji, a, b, ask, options: ['a', 'b'], answer: ask === 'mais' ? (a > b ? 'a' : 'b') : (a < b ? 'a' : 'b') })
const pat = (id, seq, answer, options) => ({ id, type: 'pattern', seq, options, answer })

export default {
  slug: 'matematica-visual',
  levels: [
    {
      year: 1, level: 1, title: 'Vamos contar',
      instruction: 'Conte com calma e escolha o número.',
      exercises: [
        count('mv-1-1-1', '🍎', 'maçãs', 4, [3, 4, 5]),
        count('mv-1-1-2', '⭐', 'estrelas', 6, [5, 6, 7]),
        count('mv-1-1-3', '🐟', 'peixes', 3, [2, 3, 4]),
        count('mv-1-1-4', '🎈', 'balões', 8, [7, 8, 9]),
        count('mv-1-1-5', '🐥', 'pintinhos', 10, [8, 9, 10]),
      ],
    },
    {
      year: 1, level: 2, title: 'Qual número falta?',
      instruction: 'Veja a sequência e descubra o número que falta.',
      exercises: [
        seq('mv-1-2-1', [1, 2, null, 4], 3, [3, 5, 6]),
        seq('mv-1-2-2', [5, 6, 7, null], 8, [8, 9, 10]),
        seq('mv-1-2-3', [10, 9, null, 7], 8, [6, 8, 9]),
        seq('mv-1-2-4', [3, null, 5, 6], 4, [2, 4, 7]),
        cmp('mv-1-2-5', '🍪', 7, 4, 'mais'),
      ],
    },
    {
      year: 1, level: 3, title: 'Juntar quantidades',
      instruction: 'Junte os grupos e conte quantos ficam.',
      exercises: [
        add('mv-1-3-1', '🍓', 2, 1, [2, 3, 4]),
        add('mv-1-3-2', '🐠', 3, 2, [4, 5, 6]),
        add('mv-1-3-3', '🚗', 4, 1, [4, 5, 6]),
        add('mv-1-3-4', '🌼', 3, 3, [5, 6, 7]),
        add('mv-1-3-5', '🧁', 5, 2, [6, 7, 8]),
      ],
    },
    {
      year: 2, level: 1, title: 'Sequências',
      instruction: 'Descubra o número que falta na sequência.',
      exercises: [
        seq('mv-2-1-1', [2, 4, null, 8], 6, [5, 6, 7]),
        seq('mv-2-1-2', [10, 20, null, 40], 30, [25, 30, 35]),
        seq('mv-2-1-3', [5, 10, 15, null], 20, [18, 20, 25]),
        seq('mv-2-1-4', [20, 18, null, 14], 16, [15, 16, 17]),
        seq('mv-2-1-5', [47, 48, null, 50], 49, [39, 49, 51]),
      ],
    },
    {
      year: 2, level: 2, title: 'Juntar e tirar',
      instruction: 'Veja os desenhos. Some ou tire e escolha o resultado.',
      exercises: [
        add('mv-2-2-1', '🍪', 8, 5, [12, 13, 14]),
        add('mv-2-2-2', '🍎', 9, 6, [14, 15, 16]),
        sub('mv-2-2-3', '🎈', 12, 4, [7, 8, 9]),
        sub('mv-2-2-4', '🍬', 15, 6, [8, 9, 10]),
        sub('mv-2-2-5', '⭐', 14, 5, [8, 9, 10]),
      ],
    },
    {
      year: 2, level: 3, title: 'Padrões e comparações',
      instruction: 'Descubra o padrão e compare as quantidades.',
      exercises: [
        pat('mv-2-3-1', ['🔴', '🔵', '🔴', '🔵', '🔴', null], '🔵', ['🔴', '🔵', '🟡']),
        pat('mv-2-3-2', ['🔺', '🔺', '🟦', '🔺', '🔺', null], '🟦', ['🔺', '🟦', '⭕']),
        pat('mv-2-3-3', ['⭐', '🌙', '☀️', '⭐', '🌙', null], '☀️', ['⭐', '🌙', '☀️']),
        cmp('mv-2-3-4', '🍇', 14, 11, 'mais'),
        cmp('mv-2-3-5', '🐞', 9, 16, 'menos'),
      ],
    },
  ],
}
