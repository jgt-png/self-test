import express from "express";
import cors from "cors";
import { checkDbConnection, query } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

const useInMemory = process.env.NO_DB === "true";
const inMemoryResults: Array<{
  id: number;
  player_name: string;
  attempts: number;
  success_status: "성공" | "실패";
  duration_ms: number;
  created_at_text: string;
}> = [];
let nextId = 1;

app.get("/api/health", async (_req, res) => {
  try {
    if (!useInMemory) {
      await checkDbConnection();
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: "DB 연결 실패" });
  }
});

app.get("/api/results", async (_req, res) => {
  if (useInMemory) {
    res.json({ ok: true, items: [...inMemoryResults].reverse().slice(0, 50) });
    return;
  }

  try {
    const result = await query(
      "SELECT id, player_name, attempts, success_status, duration_ms, created_at_text FROM game_results ORDER BY id DESC LIMIT 50"
    );
    res.json({ ok: true, items: result.rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: "결과 조회 실패" });
  }
});

app.post("/api/results", async (req, res) => {
  const { player_name, attempts, success_status, duration_ms } = req.body ?? {};

  if (
    typeof player_name !== "string" ||
    player_name.trim().length === 0 ||
    typeof attempts !== "number" ||
    attempts <= 0 ||
    typeof duration_ms !== "number" ||
    duration_ms < 0 ||
    (success_status !== "성공" && success_status !== "실패")
  ) {
    res.status(400).json({ ok: false, error: "입력값이 올바르지 않습니다." });
    return;
  }

  if (useInMemory) {
    const createdAt = new Date();
    const createdAtText = createdAt
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const item = {
      id: nextId++,
      player_name: player_name.trim(),
      attempts,
      success_status,
      duration_ms,
      created_at_text: createdAtText,
    };
    inMemoryResults.push(item);
    res.status(201).json({ ok: true, item });
    return;
  }

  try {
    const result = await query(
      "INSERT INTO game_results (player_name, attempts, success_status, duration_ms) VALUES ($1, $2, $3, $4) RETURNING id, player_name, attempts, success_status, duration_ms, created_at_text",
      [player_name.trim(), attempts, success_status, duration_ms]
    );

    res.status(201).json({ ok: true, item: result.rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: "결과 저장 실패" });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
