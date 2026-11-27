// Atividade 2 — Arrastar e Soltar (classificação e coordenação motora)
// Cada exercício é uma "mesa": itens para guardar nos grupos certos.
const cat = (id, label, emoji) => ({ id, label, emoji })
const it = (id, emoji, label, c) => ({ id, emoji, label, cat: c })
const sh = (id, shape, color, colorName, shapeName, c) => ({ id, shape, color, label: `${shapeName} ${colorName}`, cat: c })

const ANIM = cat('animais', 'Animais', '🐾')
const FRUT = cat('frutas', 'Frutas', '🍓')
const TRAN = cat('transportes', 'Transportes', '🚦')

export default {
  slug: 'arrastar-soltar',
  levels: [
    {
      year: 1, level: 1, title: 'Animais e frutas',
      instruction: 'Leve cada figura para o grupo certo.',
      exercises: [
        { id: 'as-1-1-1', type: 'sort', prompt: 'Quem é animal? Quem é fruta?', categories: [ANIM, FRUT],
          items: [it('a', '🐶', 'cachorro', 'animais'), it('b', '🍎', 'maçã', 'frutas'), it('c', '🐱', 'gato', 'animais'), it('d', '🍌', 'banana', 'frutas')] },
        { id: 'as-1-1-2', type: 'sort', prompt: 'Quem é animal? Quem é fruta?', categories: [ANIM, FRUT],
          items: [it('a', '🍇', 'uva', 'frutas'), it('b', '🐸', 'sapo', 'animais'), it('c', '🐰', 'coelho', 'animais'), it('d', '🍓', 'morango', 'frutas')] },
      ],
    },
    {
      year: 1, level: 2, title: 'Frutas e transportes',
      instruction: 'Leve cada figura para o grupo certo.',
      exercises: [
        { id: 'as-1-2-1', type: 'sort', prompt: 'O que é fruta? O que é transporte?', categories: [FRUT, TRAN],
          items: [it('a', '🍊', 'laranja', 'frutas'), it('b', '🚗', 'carro', 'transportes'), it('c', '🍉', 'melancia', 'frutas'), it('d', '🚲', 'bicicleta', 'transportes')] },
        { id: 'as-1-2-2', type: 'sort', prompt: 'O que é fruta? O que é transporte?', categories: [FRUT, TRAN],
          items: [it('a', '🚌', 'ônibus', 'transportes'), it('b', '🍐', 'pera', 'frutas'), it('c', '✈️', 'avião', 'transportes'), it('d', '🍒', 'cereja', 'frutas')] },
      ],
    },
    {
      year: 1, level: 3, title: 'Cores e formas',
      instruction: 'Separe as peças pela cor ou pela forma.',
      exercises: [
        { id: 'as-1-3-1', type: 'sort', prompt: 'Separe pela COR.', categories: [cat('vermelho', 'Vermelhas', '🔴'), cat('azul', 'Azuis', '🔵')],
          items: [sh('a', 'circle', '#e5484d', 'vermelho', 'círculo', 'vermelho'), sh('b', 'square', '#2f6fdb', 'azul', 'quadrado', 'azul'), sh('c', 'triangle', '#e5484d', 'vermelho', 'triângulo', 'vermelho'), sh('d', 'circle', '#2f6fdb', 'azul', 'círculo', 'azul')] },
        { id: 'as-1-3-2', type: 'sort', prompt: 'Agora separe pela FORMA.', categories: [cat('circulos', 'Círculos', '⚪'), cat('quadrados', 'Quadrados', '⬜')],
          items: [sh('a', 'circle', '#f2b705', 'amarelo', 'círculo', 'circulos'), sh('b', 'square', '#e5484d', 'vermelho', 'quadrado', 'quadrados'), sh('c', 'square', '#2f6fdb', 'azul', 'quadrado', 'quadrados'), sh('d', 'circle', '#2f9e5b', 'verde', 'círculo', 'circulos')] },
      ],
    },
    {
      year: 2, level: 1, title: 'Três grupos',
      instruction: 'Agora são três grupos. Leve cada figura para o lugar certo.',
      exercises: [
        { id: 'as-2-1-1', type: 'sort', prompt: 'Animais, frutas ou transportes?', categories: [ANIM, FRUT, TRAN],
          items: [it('a', '🐘', 'elefante', 'animais'), it('b', '🍌', 'banana', 'frutas'), it('c', '🚒', 'caminhão de bombeiro', 'transportes'), it('d', '🦁', 'leão', 'animais'), it('e', '🍍', 'abacaxi', 'frutas'), it('f', '🚂', 'trem', 'transportes')] },
        { id: 'as-2-1-2', type: 'sort', prompt: 'Animais, frutas ou transportes?', categories: [ANIM, FRUT, TRAN],
          items: [it('a', '🚜', 'trator', 'transportes'), it('b', '🐢', 'tartaruga', 'animais'), it('c', '🍑', 'pêssego', 'frutas'), it('d', '⛵', 'barco', 'transportes'), it('e', '🐝', 'abelha', 'animais'), it('f', '🥭', 'manga', 'frutas')] },
      ],
    },
    {
      year: 2, level: 2, title: 'Onde vivem?',
      instruction: 'Leve cada bicho para o lugar onde ele vive.',
      exercises: [
        { id: 'as-2-2-1', type: 'sort', prompt: 'Água, terra ou céu?', categories: [cat('agua', 'Água', '🌊'), cat('terra', 'Terra', '🌳'), cat('ceu', 'Céu', '☁️')],
          items: [it('a', '🐟', 'peixe', 'agua'), it('b', '🐘', 'elefante', 'terra'), it('c', '🦅', 'águia', 'ceu'), it('d', '🐙', 'polvo', 'agua'), it('e', '🐄', 'vaca', 'terra'), it('f', '🦋', 'borboleta', 'ceu')] },
        { id: 'as-2-2-2', type: 'sort', prompt: 'Água, terra ou céu?', categories: [cat('agua', 'Água', '🌊'), cat('terra', 'Terra', '🌳'), cat('ceu', 'Céu', '☁️')],
          items: [it('a', '🦜', 'papagaio', 'ceu'), it('b', '🐬', 'golfinho', 'agua'), it('c', '🐴', 'cavalo', 'terra'), it('d', '🐠', 'peixe-palhaço', 'agua'), it('e', '🐝', 'abelha', 'ceu'), it('f', '🦁', 'leão', 'terra')] },
      ],
    },
    {
      year: 2, level: 3, title: 'Cada coisa no seu lugar',
      instruction: 'Onde cada objeto fica? Leve para o cômodo ou lugar certo.',
      exercises: [
        { id: 'as-2-3-1', type: 'sort', prompt: 'Cozinha, escola ou banheiro?', categories: [cat('cozinha', 'Cozinha', '🍳'), cat('escola', 'Escola', '🏫'), cat('banheiro', 'Banheiro', '🛁')],
          items: [it('a', '🥄', 'colher', 'cozinha'), it('b', '✏️', 'lápis', 'escola'), it('c', '🪥', 'escova de dentes', 'banheiro'), it('d', '🍳', 'frigideira', 'cozinha'), it('e', '📚', 'livros', 'escola'), it('f', '🧼', 'sabonete', 'banheiro')] },
        { id: 'as-2-3-2', type: 'sort', prompt: 'Cozinha, escola ou banheiro?', categories: [cat('cozinha', 'Cozinha', '🍳'), cat('escola', 'Escola', '🏫'), cat('banheiro', 'Banheiro', '🛁')],
          items: [it('a', '🎒', 'mochila', 'escola'), it('b', '🍽️', 'prato', 'cozinha'), it('c', '🚿', 'chuveiro', 'banheiro'), it('d', '📏', 'régua', 'escola'), it('e', '🥣', 'tigela', 'cozinha'), it('f', '🧻', 'papel higiênico', 'banheiro')] },
      ],
    },
  ],
}
