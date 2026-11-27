# AltLearn — frontend (React + Vite)

PWA com 5 jogos para o 1º e 2º ano (30 fases), área do estudante, personalização de interface e conta de usuário.

```bash
npm install
npm run validate:content   # confere os 113 exercícios (1 resposta certa por exercício etc.)
npm run dev                # http://localhost:5173  (a API Laravel em http://127.0.0.1:8000 recebe /api)
npm run build              # gera dist/ (manifesto + service worker já ficam em public/)
```

Sem a API no ar o site funciona normalmente como visitante: jogos, personalização e progresso ficam no aparelho.

## Estrutura
- `src/content/` — todo o conteúdo pedagógico (uma única fonte; `npm run export:content` gera o JSON do seeder do MySQL)
- `src/games/` — um componente por jogo + `GameRunner` (estrutura comum, dicas, pausa calma, estrelas)
- `src/pages/` — Área do estudante (`/jogos`), menu/jogo (`/jogos/:slug`), Personalização (`/acessibilidade`), 404
- `src/ThemeContext.jsx` (preferências), `AuthContext.jsx`, `ProgressContext.jsx` (progresso + fila offline), `api.js`
- `src/styles/games.css` — estilos das telas novas (mesma identidade do protótipo); `App.css` é o do protótipo
- `public/manifest.webmanifest`, `public/sw.js`, `public/icons/` — PWA
