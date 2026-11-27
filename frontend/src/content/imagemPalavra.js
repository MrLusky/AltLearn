// Atividade 1 — Associação entre Imagem e Palavra (alfabetização)
// Tipos: img2word (figura → palavra), audio2word (ouvir → palavra),
//        word2img (palavra → figura) e complete (completar a sílaba).
const w = (text) => ({ value: text, text })
const pic = (emoji, label) => ({ value: label, emoji, label })

export default {
  slug: 'imagem-palavra',
  levels: [
    {
      year: 1, level: 1, title: 'Veja e escolha',
      instruction: 'Olhe a figura e escolha a palavra certa.',
      exercises: [
        { id: 'ip-1-1-1', type: 'img2word', emoji: '🐱', word: 'GATO', options: [w('GATO'), w('BOLA')], answer: 'GATO' },
        { id: 'ip-1-1-2', type: 'img2word', emoji: '🏠', word: 'CASA', options: [w('SOL'), w('CASA')], answer: 'CASA' },
        { id: 'ip-1-1-3', type: 'img2word', emoji: '🌙', word: 'LUA', options: [w('LUA'), w('UVA'), w('MALA')], answer: 'LUA' },
        { id: 'ip-1-1-4', type: 'img2word', emoji: '🍇', word: 'UVA', options: [w('VACA'), w('UVA'), w('SAPO')], answer: 'UVA' },
        { id: 'ip-1-1-5', type: 'img2word', emoji: '⚽', word: 'BOLA', options: [w('BOLA'), w('GATO'), w('LUA')], answer: 'BOLA' },
      ],
    },
    {
      year: 1, level: 2, title: 'Ouça e escolha',
      instruction: 'Ouça a palavra, olhe a figura e escolha a palavra escrita.',
      exercises: [
        { id: 'ip-1-2-1', type: 'audio2word', emoji: '🐄', word: 'VACA', options: [w('VACA'), w('BOLA'), w('LUA')], answer: 'VACA' },
        { id: 'ip-1-2-2', type: 'audio2word', emoji: '🐸', word: 'SAPO', options: [w('SOL'), w('SAPO'), w('UVA')], answer: 'SAPO' },
        { id: 'ip-1-2-3', type: 'audio2word', emoji: '☀️', word: 'SOL', options: [w('SOL'), w('SAPO'), w('MALA')], answer: 'SOL' },
        { id: 'ip-1-2-4', type: 'audio2word', emoji: '🎂', word: 'BOLO', options: [w('BOLA'), w('BOLO'), w('GATO')], answer: 'BOLO' },
        { id: 'ip-1-2-5', type: 'audio2word', emoji: '🦆', word: 'PATO', options: [w('PATO'), w('GATO'), w('CASA')], answer: 'PATO' },
      ],
    },
    {
      year: 1, level: 3, title: 'Palavra e figura',
      instruction: 'Leia a palavra e escolha a figura que combina.',
      exercises: [
        { id: 'ip-1-3-1', type: 'word2img', word: 'GATO', options: [pic('🐱', 'GATO'), pic('🐄', 'VACA')], answer: 'GATO' },
        { id: 'ip-1-3-2', type: 'word2img', word: 'CASA', options: [pic('🌙', 'LUA'), pic('🏠', 'CASA'), pic('🍇', 'UVA')], answer: 'CASA' },
        { id: 'ip-1-3-3', type: 'word2img', word: 'PATO', options: [pic('🦆', 'PATO'), pic('🐸', 'SAPO'), pic('⚽', 'BOLA')], answer: 'PATO' },
        { id: 'ip-1-3-4', type: 'word2img', word: 'MALA', options: [pic('🎂', 'BOLO'), pic('☀️', 'SOL'), pic('🧳', 'MALA')], answer: 'MALA' },
        { id: 'ip-1-3-5', type: 'word2img', word: 'BOLO', options: [pic('🎂', 'BOLO'), pic('⚽', 'BOLA'), pic('🐱', 'GATO')], answer: 'BOLO' },
      ],
    },
    {
      year: 2, level: 1, title: 'Leia a palavra inteira',
      instruction: 'Olhe a figura e leia com atenção. Escolha a palavra certa.',
      exercises: [
        { id: 'ip-2-1-1', type: 'img2word', emoji: '🌸', word: 'FLOR', options: [w('FLOR'), w('FRUTA'), w('FOGO')], answer: 'FLOR' },
        { id: 'ip-2-1-2', type: 'img2word', emoji: '🌧️', word: 'CHUVA', options: [w('CHAVE'), w('CHUVA'), w('CHEIRO')], answer: 'CHUVA' },
        { id: 'ip-2-1-3', type: 'img2word', emoji: '🐰', word: 'COELHO', options: [w('CAMELO'), w('COELHO'), w('COLHER')], answer: 'COELHO' },
        { id: 'ip-2-1-4', type: 'img2word', emoji: '🏫', word: 'ESCOLA', options: [w('ESCADA'), w('ESTRELA'), w('ESCOLA')], answer: 'ESCOLA' },
        { id: 'ip-2-1-5', type: 'img2word', emoji: '☁️', word: 'NUVEM', options: [w('NAVIO'), w('NUVEM'), w('NOVELO')], answer: 'NUVEM' },
      ],
    },
    {
      year: 2, level: 2, title: 'Só pelo som',
      instruction: 'Ouça a palavra. Não tem figura! Escolha a palavra escrita.',
      exercises: [
        { id: 'ip-2-2-1', type: 'audio2word', word: 'ABELHA', options: [w('ABELHA'), w('ORELHA'), w('OVELHA')], answer: 'ABELHA' },
        { id: 'ip-2-2-2', type: 'audio2word', word: 'GIRAFA', options: [w('GARRAFA'), w('GIRAFA'), w('JARRA')], answer: 'GIRAFA' },
        { id: 'ip-2-2-3', type: 'audio2word', word: 'SAPATO', options: [w('SAPO'), w('PATO'), w('SAPATO')], answer: 'SAPATO' },
        { id: 'ip-2-2-4', type: 'audio2word', word: 'JANELA', options: [w('PANELA'), w('JANELA'), w('CANELA')], answer: 'JANELA' },
        { id: 'ip-2-2-5', type: 'audio2word', word: 'BANANA', options: [w('BANDA'), w('BARCO'), w('BANANA')], answer: 'BANANA' },
      ],
    },
    {
      year: 2, level: 3, title: 'Complete a palavra',
      instruction: 'Falta um pedacinho! Escolha a sílaba que completa a palavra.',
      exercises: [
        { id: 'ip-2-3-1', type: 'complete', emoji: '🦋', word: 'BORBOLETA', parts: ['BOR', null, 'LE', 'TA'], options: [w('BO'), w('PO'), w('CO')], answer: 'BO' },
        { id: 'ip-2-3-2', type: 'complete', emoji: '🚲', word: 'BICICLETA', parts: ['BI', 'CI', null, 'TA'], options: [w('CLE'), w('CLI'), w('PLE')], answer: 'CLE' },
        { id: 'ip-2-3-3', type: 'complete', emoji: '🐘', word: 'ELEFANTE', parts: ['E', 'LE', null, 'TE'], options: [w('VAN'), w('FAN'), w('FEN')], answer: 'FAN' },
        { id: 'ip-2-3-4', type: 'complete', emoji: '🐟', word: 'PEIXE', parts: ['PEI', null], options: [w('SE'), w('XE'), w('CE')], answer: 'XE' },
        { id: 'ip-2-3-5', type: 'complete', emoji: '🪑', word: 'CADEIRA', parts: ['CA', 'DEI', null], options: [w('LA'), w('RA'), w('NA')], answer: 'RA' },
      ],
    },
  ],
}
