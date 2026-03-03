CREATE TABLE IF NOT EXISTS game_results (
  id SERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  attempts INTEGER NOT NULL,
  success_status TEXT NOT NULL CHECK (success_status IN ('성공', '실패')),
  duration_ms INTEGER NOT NULL,
  created_at_text TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD HH24:MI:SS')
);
