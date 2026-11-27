// Atividade 3 — Sequência de Rotina (organização temporal)
// "cards" está na ORDEM CORRETA; a tela embaralha antes de mostrar.
const c = (id, emoji, label) => ({ id, emoji, label })

export default {
  slug: 'rotina',
  levels: [
    {
      year: 1, level: 1, title: 'Três passinhos',
      instruction: 'Coloque os cartões na ordem. O que vem primeiro?',
      exercises: [
        { id: 'ro-1-1-1', type: 'routine', title: 'Ao acordar', cards: [c('a', '🛏️', 'Acordar'), c('b', '🪥', 'Escovar os dentes'), c('c', '🥣', 'Tomar café da manhã')] },
        { id: 'ro-1-1-2', type: 'routine', title: 'Hora de dormir', cards: [c('a', '🍽️', 'Jantar'), c('b', '🪥', 'Escovar os dentes'), c('c', '😴', 'Dormir')] },
      ],
    },
    {
      year: 1, level: 2, title: 'Quatro passinhos',
      instruction: 'Coloque os cartões na ordem. O que vem primeiro?',
      exercises: [
        { id: 'ro-1-2-1', type: 'routine', title: 'De manhã', cards: [c('a', '🛏️', 'Acordar'), c('b', '🪥', 'Escovar os dentes'), c('c', '👕', 'Vestir-se'), c('d', '🥣', 'Tomar café da manhã')] },
        { id: 'ro-1-2-2', type: 'routine', title: 'Chegando à escola', cards: [c('a', '🚌', 'Ir para a escola'), c('b', '🏫', 'Entrar na sala'), c('c', '🪑', 'Sentar na cadeira'), c('d', '📒', 'Abrir o caderno')] },
      ],
    },
    {
      year: 1, level: 3, title: 'Cinco passinhos',
      instruction: 'Coloque os cartões na ordem. Você consegue!',
      exercises: [
        { id: 'ro-1-3-1', type: 'routine', title: 'Minha manhã', cards: [c('a', '🛏️', 'Acordar'), c('b', '🪥', 'Escovar os dentes'), c('c', '👕', 'Vestir-se'), c('d', '🥣', 'Tomar café da manhã'), c('e', '🏫', 'Ir para a escola')] },
        { id: 'ro-1-3-2', type: 'routine', title: 'Minha noite', cards: [c('a', '🍽️', 'Jantar'), c('b', '🛁', 'Tomar banho'), c('c', '🩳', 'Vestir o pijama'), c('d', '🪥', 'Escovar os dentes'), c('e', '😴', 'Dormir')] },
      ],
    },
    {
      year: 2, level: 1, title: 'Passo a passo',
      instruction: 'Organize os passos na ordem certa.',
      exercises: [
        { id: 'ro-2-1-1', type: 'routine', title: 'Lavar as mãos', cards: [c('a', '🚰', 'Abrir a torneira'), c('b', '💧', 'Molhar as mãos'), c('c', '🧼', 'Passar sabonete'), c('d', '🫧', 'Enxaguar'), c('e', '🧻', 'Secar com a toalha')] },
        { id: 'ro-2-1-2', type: 'routine', title: 'Fazer um sanduíche', cards: [c('a', '🍞', 'Pegar o pão'), c('b', '🧈', 'Passar a manteiga'), c('c', '🧀', 'Colocar o queijo'), c('d', '🥪', 'Fechar o sanduíche'), c('e', '😋', 'Comer')] },
      ],
    },
    {
      year: 2, level: 2, title: 'O tempo passa',
      instruction: 'Organize na ordem em que acontece.',
      exercises: [
        { id: 'ro-2-2-1', type: 'routine', title: 'Uma planta nasce', cards: [c('a', '🌰', 'Semente'), c('b', '🪴', 'Colocar na terra'), c('c', '💧', 'Regar'), c('d', '🌱', 'Brotar'), c('e', '🌻', 'Florescer')] },
        { id: 'ro-2-2-2', type: 'routine', title: 'Um dia inteiro', cards: [c('a', '🌅', 'Manhã'), c('b', '☀️', 'Meio-dia'), c('c', '🌇', 'Tarde'), c('d', '🌙', 'Noite')] },
      ],
    },
    {
      year: 2, level: 3, title: 'Meu dia na escola',
      instruction: 'Organize o dia e a semana na ordem certa.',
      exercises: [
        { id: 'ro-2-3-1', type: 'routine', title: 'Dia na escola', cards: [c('a', '🚌', 'Chegar à escola'), c('b', '🎒', 'Guardar a mochila'), c('c', '📚', 'Fazer a atividade'), c('d', '🍎', 'Hora do lanche'), c('e', '⚽', 'Brincar no recreio'), c('f', '🏠', 'Voltar para casa')] },
        { id: 'ro-2-3-2', type: 'routine', title: 'Dias da semana', cards: [c('a', '📅', 'Segunda-feira'), c('b', '📅', 'Terça-feira'), c('c', '📅', 'Quarta-feira'), c('d', '📅', 'Quinta-feira'), c('e', '📅', 'Sexta-feira')] },
      ],
    },
  ],
}
