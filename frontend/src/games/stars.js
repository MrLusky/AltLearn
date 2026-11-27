// Estrelas por fase. Ninguém "reprova": toda fase concluída dá pelo menos 1 estrela.
export function calcStars({ mistakes, hints }) {
  if (hints === 0 && mistakes <= 1) return 3
  if (hints <= 2) return 2
  return 1
}

export const OK_MESSAGES = ['Muito bem!', 'Isso mesmo!', 'Você acertou!', 'Boa!', 'Parabéns!']
export const TRY_MESSAGES = ['Quase! Olhe com calma e tente outra vez.', 'Tudo bem! Vamos tentar de novo.', 'Essa não é a certa. Pode tentar outra!']
export const FINISH_MESSAGES = {
  3: 'Uau! Você foi muito bem!',
  2: 'Muito bem! Você tentou e aprendeu.',
  1: 'Parabéns por terminar! Cada tentativa ajuda a aprender.',
}
