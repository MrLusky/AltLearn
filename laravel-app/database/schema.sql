-- AltLearn — esquema MySQL 8 (referência/DBA). O caminho oficial é `php artisan migrate`;
-- este arquivo espelha as migrations para consulta, diagrama e criação manual.
-- Tabelas padrão do Laravel (migrations, cache, jobs, sessions, personal_access_tokens, password_reset_tokens) não aparecem aqui.

CREATE DATABASE IF NOT EXISTS altlearn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE altlearn;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  google_id VARCHAR(40) NULL UNIQUE,                      -- conta vinculada ao Google (opcional)
  grade_year TINYINT UNSIGNED NOT NULL DEFAULT 1,          -- 1 = 1º ano, 2 = 2º ano
  email_verified_at TIMESTAMP NULL,
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL
);

CREATE TABLE user_preferences (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  dark_mode BOOLEAN NOT NULL DEFAULT 0,
  high_contrast BOOLEAN NOT NULL DEFAULT 0,
  font_scale DECIMAL(3,2) NOT NULL DEFAULT 1.00,           -- 1.00 | 1.20 | 1.40 | 1.60
  sound_on BOOLEAN NOT NULL DEFAULT 1,
  calm_mode BOOLEAN NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE activities (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(60) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL, subject VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL, adult_note TEXT NULL,
  bncc_codes JSON NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL
);

CREATE TABLE activity_levels (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  activity_id BIGINT UNSIGNED NOT NULL,
  grade_year TINYINT UNSIGNED NOT NULL, level TINYINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL, instruction VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  UNIQUE KEY (activity_id, grade_year, level),
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

CREATE TABLE exercises (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  activity_id BIGINT UNSIGNED NOT NULL,
  exercise_key VARCHAR(40) NOT NULL UNIQUE,
  grade_year TINYINT UNSIGNED NOT NULL, level TINYINT UNSIGNED NOT NULL, position SMALLINT UNSIGNED NOT NULL,
  kind VARCHAR(30) NOT NULL,
  payload JSON NOT NULL,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  KEY (activity_id, grade_year, level),
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

CREATE TABLE game_sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL, activity_id BIGINT UNSIGNED NOT NULL,
  grade_year TINYINT UNSIGNED NOT NULL, level TINYINT UNSIGNED NOT NULL,
  correct SMALLINT UNSIGNED NOT NULL DEFAULT 0, total SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  mistakes SMALLINT UNSIGNED NOT NULL DEFAULT 0, hints SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  stars TINYINT UNSIGNED NOT NULL DEFAULT 1,
  duration_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  KEY (user_id, played_at),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

CREATE TABLE attempts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  game_session_id BIGINT UNSIGNED NOT NULL,
  exercise_key VARCHAR(40) NOT NULL, chosen VARCHAR(60) NULL,
  is_correct BOOLEAN NOT NULL, attempt_no TINYINT UNSIGNED NOT NULL DEFAULT 1, response_ms INT UNSIGNED NULL,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  KEY (exercise_key),
  FOREIGN KEY (game_session_id) REFERENCES game_sessions(id) ON DELETE CASCADE
);

CREATE TABLE progress (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL, activity_id BIGINT UNSIGNED NOT NULL,
  grade_year TINYINT UNSIGNED NOT NULL, level TINYINT UNSIGNED NOT NULL,
  stars TINYINT UNSIGNED NOT NULL DEFAULT 0, sessions_count INT UNSIGNED NOT NULL DEFAULT 0, best_at TIMESTAMP NULL,
  created_at TIMESTAMP NULL, updated_at TIMESTAMP NULL,
  UNIQUE KEY progress_unique (user_id, activity_id, grade_year, level),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);
