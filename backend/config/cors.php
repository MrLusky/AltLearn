<?php

// Permite que o frontend (Vite em desenvolvimento ou o domínio de produção) chame a API.
// Defina FRONTEND_URL no .env (separe vários domínios por vírgula).
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_filter(array_map('trim', explode(',', env('FRONTEND_URL', 'http://localhost:5173')))),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
