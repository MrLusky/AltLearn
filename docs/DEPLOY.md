# Rodar no celular e publicar

## O que cada serviço aguenta
O **GitHub Pages hospeda só arquivos estáticos**: serve para o **frontend**. A **API Laravel + MySQL precisa de outro lugar** que rode PHP.
Sem a API o site funciona como visitante (jogos, personalização e progresso no próprio aparelho), mas **sem contas, sem login com Google e sem sincronizar o progresso**.

## Etapa A — testar no celular agora (sem hospedar)
**Opção 1: mesmo Wi-Fi.** No computador: `cd frontend && npm run dev:host`. O terminal mostra `Network: http://192.168.x.x:5173/` → digite esse endereço no navegador do celular.
A API local (`php artisan serve`) continua funcionando, porque o Vite encaminha `/api` por dentro. Se não abrir, libere a porta 5173 no firewall do Windows (rede "Privada").
Limites: sem HTTPS não instala como app nem usa o service worker; login com Google não funciona por IP.

**Opção 2: link com HTTPS (qualquer rede).** Com o `npm run dev` rodando, instale o `cloudflared` (Cloudflare) e rode `cloudflared tunnel --url http://localhost:5173`. Ele imprime um link `https://algo.trycloudflare.com` que abre o AltLearn de qualquer celular (enquanto o comando estiver aberto). O Vite já está configurado para aceitar esse domínio.

## Etapa B — frontend no GitHub Pages
1. Crie um repositório no GitHub e envie **a pasta inteira** do projeto (frontend, backend, docs, `.github`):
   ```bash
   cd altlearn-projeto
   git init -b main && git add . && git commit -m "AltLearn"
   git remote add origin https://github.com/SEU-USUARIO/altlearn.git
   git push -u origin main
   ```
2. No repositório: **Settings → Pages → Source: GitHub Actions**.
3. (Quando a API existir) **Settings → Secrets and variables → Actions → Variables**: `VITE_API_URL` = `https://sua-api.exemplo.com/api` (e `VITE_GOOGLE_CLIENT_ID`, se usar Google).
4. O workflow `.github/workflows/deploy-pages.yml` publica a cada push. O endereço será `https://SEU-USUARIO.github.io/altlearn/`. É só abrir esse link no celular; no Chrome/Android use "Instalar app" e no Safari/iPhone "Compartilhar → Adicionar à Tela de Início".

## Etapa C — API (Laravel + MySQL) publicada
Precisa de **HTTPS** (a página do GitHub é https e o navegador bloqueia chamadas http). Caminhos possíveis:
- **Hospedagem PHP + MySQL (cPanel: Hostinger, Locaweb, Hostgator…)** — o mais simples para Laravel: envie `laravel-app` (rodando `composer install --no-dev` e `php artisan migrate --seed`), aponte o domínio para a pasta `public/` e preencha o `.env`.
- **Plataformas de nuvem (Railway, Render, Fly.io…)** — rodam Laravel via Docker e oferecem MySQL; condições e planos gratuitos mudam com frequência, confira antes.
No `.env` da API, defina `FRONTEND_URL=https://SEU-USUARIO.github.io` (só a origem, sem `/altlearn`), `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL` e as credenciais do MySQL.
Ao subir o projeto Laravel no GitHub, **nunca envie o arquivo `.env`** (ele já fica fora pelo `.gitignore` do Laravel).
