// Catálogo único de conteúdo. É a mesma fonte usada para popular o MySQL
// (scripts/export-content.mjs → backend/database/seeders/data/activities.json).
import imagemPalavra from './imagemPalavra.js'
import arrastarSoltar from './arrastarSoltar.js'
import rotina from './rotina.js'
import matematicaVisual from './matematicaVisual.js'
import cacaSons from './cacaSons.js'

export const ACTIVITY_META = [
  {
    slug: 'imagem-palavra', title: 'Imagem e Palavra', subject: 'Português', category: 'Alfabetização', icon: 'letras',
    description: 'Veja a figura, ouça e encontre a palavra escrita.',
    adultNote: 'Relaciona imagem, som e escrita da palavra. Começa com figura + palavra, depois áudio e, por fim, palavra sem figura e sílabas faltando.',
    bncc: ['EF01LP07', 'EF01LP08', 'EF02LP04'],
    content: imagemPalavra,
  },
  {
    slug: 'arrastar-soltar', title: 'Arrastar e Soltar', subject: 'Classificação', category: 'Lógica e coordenação', icon: 'formas',
    description: 'Leve cada figura para o grupo certo: bichos, frutas, formas e cores.',
    adultNote: 'Trabalha classificação por atributos (categoria, cor, forma) e coordenação motora. Funciona arrastando ou tocando na figura e depois no grupo.',
    bncc: ['EF01MA09', 'EF02MA10'],
    content: arrastarSoltar,
  },
  {
    slug: 'rotina', title: 'Sequência de Rotina', subject: 'Organização', category: 'Tempo e rotina', icon: 'sun',
    description: 'Coloque os cartões do dia a dia na ordem certa.',
    adultNote: 'Organização temporal e sequenciamento com ações do cotidiano (acordar, escovar os dentes, ir à escola). Os cartões podem ser ouvidos com o botão de som.',
    bncc: ['EF01MA16', 'EF01MA17'],
    content: rotina,
  },
  {
    slug: 'matematica-visual', title: 'Matemática Visual', subject: 'Matemática', category: 'Números e contagem', icon: 'numeros',
    description: 'Conte, complete sequências, junte e compare com desenhos.',
    adultNote: 'Contagem, sequências numéricas, adição e subtração com apoio de objetos, comparação de quantidades e padrões.',
    bncc: ['EF01MA01', 'EF01MA02', 'EF01MA04', 'EF02MA05', 'EF02MA09', 'EF02MA10'],
    content: matematicaVisual,
  },
  {
    slug: 'caca-sons', title: 'Caça aos Sons', subject: 'Consciência fonológica', category: 'Sons e letras', icon: 'bee',
    description: 'Escute com atenção: encontre letras, sons iniciais e sílabas.',
    adultNote: 'Reconhecimento de letras e consciência fonológica: som inicial, sílabas, contagem de sílabas e troca de sílabas.',
    bncc: ['EF01LP07', 'EF01LP08', 'EF01LP09', 'EF02LP02'],
    content: cacaSons,
  },
]

export const ACTIVITIES = ACTIVITY_META.map(({ content, ...meta }) => ({ ...meta, levels: content.levels }))

export const YEARS = [1, 2]
export const LEVELS_PER_YEAR = 3
export const MAX_STARS_PER_YEAR = LEVELS_PER_YEAR * 3

export function getActivity(slug) {
  return ACTIVITIES.find((a) => a.slug === slug)
}

export function getLevel(slug, year, level) {
  return getActivity(slug)?.levels.find((l) => l.year === Number(year) && l.level === Number(level))
}

export function levelsOfYear(slug, year) {
  return (getActivity(slug)?.levels ?? []).filter((l) => l.year === Number(year))
}
