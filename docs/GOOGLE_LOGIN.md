# Login com Google

Já está implementado nos dois lados. Falta só **criar o ID do cliente** na sua conta Google (só você pode fazer isso).

## 1. Criar o ID do cliente (gratuito)
1. Acesse https://console.cloud.google.com → crie um projeto (ex.: "AltLearn").
2. **APIs e serviços → Tela de permissão OAuth** (ou "Google Auth Platform"): tipo **Externo**, nome do app "AltLearn", seu e-mail de suporte. Em "Público", deixe em *Teste* e adicione seu e-mail (e os de quem for testar) como usuários de teste. Para liberar para qualquer pessoa é preciso "Publicar o app".
3. **Credenciais → Criar credenciais → ID do cliente OAuth → Aplicativo da Web**.
4. Em **Origens JavaScript autorizadas** coloque (só a origem, sem caminho e sem barra no final):
   - `http://localhost:5173` (desenvolvimento)
   - `https://SEU-USUARIO.github.io` (GitHub Pages — sem `/altlearn`)
   - o domínio da sua API/site, se houver outro
   *URIs de redirecionamento não são necessários* (usamos o botão do Google, que devolve o token no próprio site).
5. Copie o **ID do cliente** (termina em `.apps.googleusercontent.com`).

## 2. Configurar
- Frontend: crie `frontend/.env.local` com `VITE_GOOGLE_CLIENT_ID=SEU_ID.apps.googleusercontent.com` e reinicie o `npm run dev`.
  No GitHub Pages: Settings → Secrets and variables → Actions → **Variables** → `VITE_GOOGLE_CLIENT_ID`.
- Backend (`.env` do Laravel): `GOOGLE_CLIENT_ID=SEU_ID.apps.googleusercontent.com`, depois `php artisan config:clear`.
- Rode `php artisan migrate` (a migration nova cria a coluna `users.google_id`).

## Como funciona
O botão do Google devolve um token assinado → o site envia para `POST /api/auth/google` → a API confere o token no serviço oficial do Google
(público-alvo = seu ID, e-mail verificado) → entra na conta com esse e-mail ou cria uma nova → devolve o token do AltLearn.
Quem já tinha conta com o mesmo e-mail passa a poder entrar pelos dois jeitos. Conta nova criada pelo Google herda o progresso de visitante (uma única vez), como no cadastro.

## Limites
- O login do Google **não funciona por IP** (ex.: `http://192.168.0.10:5173`) nem em túneis com endereço que muda a cada uso. Teste em `localhost` ou no site publicado.
