#!/usr/bin/env bash
# Cria o projeto Laravel e aplica os arquivos do AltLearn por cima.
# Requisitos: PHP 8.2+, Composer, MySQL 8 (ou: docker compose up -d na raiz do projeto).
set -euo pipefail
cd "$(dirname "$0")"
OVERLAY="$(pwd)"
TARGET="${1:-../laravel-app}"

if [ ! -d "$TARGET" ]; then
  composer create-project laravel/laravel "$TARGET" --prefer-dist
fi

cd "$TARGET"
php artisan install:api --no-interaction || true   # instala o Laravel Sanctum e cria routes/api.php

# copia os arquivos do AltLearn (modelos, controllers, rotas, migrations, seeders, CORS)
cp -R "$OVERLAY/app/." app/
cp -R "$OVERLAY/routes/." routes/
cp -R "$OVERLAY/config/." config/
cp -R "$OVERLAY/database/." database/

# variáveis do banco
if ! grep -q "FRONTEND_URL" .env; then
  sed -i.bak -E '/^DB_(CONNECTION|HOST|PORT|DATABASE|USERNAME|PASSWORD)=/d' .env && rm -f .env.bak
  cat "$OVERLAY/env.example" >> .env
fi

php artisan migrate --seed
echo
echo "Pronto! Inicie a API com:  php artisan serve   (http://127.0.0.1:8000)"
