# Conteúdo dos jogos e alinhamento com a BNCC

Alinhamento **inicial**, baseado na descrição das atividades (como no artigo, seção 3). Deve ser revisado por professores.
Códigos marcados com * não aparecem no texto do artigo; foram acrescentados por mim e precisam de validação.

| Jogo | 1º ano (3 fases) | 2º ano (3 fases) | Habilidades |
|---|---|---|---|
| Imagem e Palavra | figura→palavra; ouvir+figura→palavra; palavra→figura | figura→palavra com mais letras; só pelo som (sem figura); completar a sílaba | EF01LP07, EF01LP08, EF02LP04 |
| Arrastar e Soltar | animais×frutas; frutas×transportes; cores e formas | 3 grupos; onde vivem (água/terra/céu); objetos por lugar | EF01MA09, EF02MA10 |
| Sequência de Rotina | 3, 4 e 5 cartões (manhã, noite, escola) | passo a passo (lavar as mãos), ciclos (planta, dia), dia na escola/dias da semana | EF01MA16*, EF01MA17* |
| Matemática Visual | contar até 10; sequência 1–10 e comparar; juntar (adição ≤ 10) | sequências (2 em 2, 10 em 10, a partir de qualquer número); juntar e tirar até 20; padrões e comparação | EF01MA01, EF01MA02, EF01MA04, EF02MA05, EF02MA09, EF02MA10 |
| Caça aos Sons | encontrar a letra (só pelo áudio); letra inicial; figura que começa com a mesma sílaba | sílaba inicial; contar sílabas (uma palma revela uma sílaba); trocar sílaba | EF01LP07, EF01LP08, EF01LP09, EF02LP02 |

Total: 5 jogos × 2 anos × 3 fases = 30 fases e 113 exercícios (`frontend/src/content/`).
Cada fase vale até 3 estrelas; toda fase concluída dá pelo menos 1 (não há "reprovar").

## Decisões de design para crianças autistas
- **Previsibilidade:** mesma estrutura em todos os jogos (barra superior → enunciado → atividade → feedback → botão "Próximo"). A criança controla o ritmo; nada avança sozinho.
- **Sem tempo, sem perda de pontos, sem sons de erro:** resposta errada só esmaece a opção; após 2 erros a resposta certa ganha destaque (aprendizagem sem erro). Tom de erro é curto, grave e suave.
- **Uma tarefa por tela** e instruções curtas, sempre também escritas (o áudio apenas reforça).
- **Entrada flexível (motricidade):** arrastar, ou tocar na figura e depois no destino, ou teclado. Alvos ≥ 44 px.
- **Estados nunca só por cor:** ✓, ↺, bordas tracejadas/sólidas e números acompanham as cores.
- **Autorregulação:** botão "Pausa calma" (respiração guiada, sem tempo) em todo jogo.
- **Estímulos ajustáveis:** som ligado/desligado, alto contraste, 4 tamanhos de letra, modo escuro e modo calmo (sem animações). Respeita `prefers-reduced-motion`.
- **Apoio ao 1 a 1 na contagem:** em "Contar", cada toque numera o objeto e fala o número.
