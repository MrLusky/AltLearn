# AltLearn

Aplicativo web progressivo (PWA) de apoio à aprendizagem de crianças com TEA no 1º e 2º anos do Ensino Fundamental.

| Camada | Tecnologia |
|---|---|
| Frontend | React 19 + Vite + React Router (identidade visual do protótipo) |
| Backend | Laravel (PHP 8.2+) + Laravel Sanctum (token Bearer) |
| Banco | MySQL 8 |

## Como rodar
```bash
# 1) Banco (opcional, via Docker)
docker compose up -d

# 2) API: cria o projeto Laravel em ../laravel-app, aplica os arquivos de backend/, migra e popula o banco
cd backend && ./setup.sh
cd ../laravel-app && php artisan serve          # http://127.0.0.1:8000

# 3) Frontend
cd ../frontend && npm install && npm run dev    # http://localhost:5173
```
Sem MySQL/API o site continua funcionando como visitante (progresso guardado no aparelho).

## O que existe (conforme o artigo)
- 5 atividades: **Imagem e Palavra**, **Arrastar e Soltar**, **Sequência de Rotina**, **Matemática Visual**, **Caça aos Sons** — 3 fases por ano.
- Início, Sobre nós (institucional), Entrar/Criar conta, **Área do estudante** com progresso (estrelas).
- Personalização: alto contraste, tamanho da fonte (4 níveis), som ligado/desligado (+ modo escuro e modo calmo).
- Feedback de apoio: sem punição, dica gentil após 2 tentativas, pausa calma.
- PWA: manifesto instalável, service worker (abre sem internet depois da 1ª visita) e fila de progresso offline.
- API: `POST /api/register|login|logout`, `GET /api/me`, `GET|PUT /api/preferences`, `GET /api/activities[/{slug}]`, `POST /api/sessions`, `GET /api/progress`.

Detalhes pedagógicos e de acessibilidade: `docs/CONTEUDO_E_BNCC.md`.
Celular, GitHub Pages e publicação da API: `docs/DEPLOY.md`. Login com Google: `docs/GOOGLE_LOGIN.md`.