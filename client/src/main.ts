import "./style.css";

type GuessItem = { guess: string; strike: number; ball: number };

type ResultItem = {
  id: number;
  player_name: string;
  attempts: number;
  success_status: "성공" | "실패";
  duration_ms: number;
  created_at_text: string;
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app not found");
}

app.innerHTML = `
  <main class="container">
    <section class="hero">
      <h1>숫자 야구 게임</h1>
      <p>서로 다른 4자리 숫자를 맞춰보세요. 최대 10번 도전!</p>
    </section>

    <section class="panel">
      <div class="row">
        <label for="playerName">플레이어 이름</label>
        <input id="playerName" type="text" placeholder="예: 홍길동" maxlength="20" />
      </div>

      <div class="row">
        <label for="guessInput">추측 숫자</label>
        <input id="guessInput" type="text" inputmode="numeric" maxlength="4" placeholder="4자리 숫자" />
        <button id="guessBtn">도전</button>
      </div>

      <div class="actions">
        <button id="newGameBtn" class="secondary">새 게임</button>
        <button id="giveUpBtn" class="danger">포기</button>
      </div>

      <div id="status" class="status"></div>

      <div class="history">
        <h2>기록</h2>
        <ul id="historyList"></ul>
      </div>
    </section>

    <section class="panel">
      <h2>최근 저장 결과</h2>
      <div class="table">
        <div class="table-row table-head">
          <span>이름</span>
          <span>시도</span>
          <span>성공여부</span>
          <span>소요(ms)</span>
          <span>저장시각</span>
        </div>
        <div id="results"></div>
      </div>
    </section>
  </main>
`;

const playerNameInput = document.querySelector<HTMLInputElement>("#playerName");
const guessInput = document.querySelector<HTMLInputElement>("#guessInput");
const guessBtn = document.querySelector<HTMLButtonElement>("#guessBtn");
const newGameBtn = document.querySelector<HTMLButtonElement>("#newGameBtn");
const giveUpBtn = document.querySelector<HTMLButtonElement>("#giveUpBtn");
const statusEl = document.querySelector<HTMLDivElement>("#status");
const historyList = document.querySelector<HTMLUListElement>("#historyList");
const resultsEl = document.querySelector<HTMLDivElement>("#results");

if (!playerNameInput || !guessInput || !guessBtn || !newGameBtn || !giveUpBtn || !statusEl || !historyList || !resultsEl) {
  throw new Error("UI elements not found");
}

let secret: string[] = [];
let attempts = 0;
const maxAttempts = 10;
let history: GuessItem[] = [];
let isFinished = false;
let startTime = Date.now();
let hasSaved = false;

function generateSecret() {
  const digits = Array.from({ length: 10 }, (_, i) => String(i));
  const result: string[] = [];
  while (result.length < 4) {
    const index = Math.floor(Math.random() * digits.length);
    result.push(digits.splice(index, 1)[0]);
  }
  return result;
}

function resetGame() {
  secret = generateSecret();
  attempts = 0;
  history = [];
  isFinished = false;
  hasSaved = false;
  startTime = Date.now();
  statusEl.textContent = "새 게임 시작! 4자리 숫자를 입력하세요.";
  historyList.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
}

function validateGuess(value: string) {
  if (!/^\d{4}$/.test(value)) {
    return "4자리 숫자를 입력하세요.";
  }
  const digits = value.split("");
  const unique = new Set(digits);
  if (unique.size !== 4) {
    return "중복 없는 숫자를 입력하세요.";
  }
  return null;
}

function evaluateGuess(value: string) {
  const digits = value.split("");
  let strike = 0;
  let ball = 0;

  digits.forEach((digit, index) => {
    if (secret[index] === digit) {
      strike += 1;
    } else if (secret.includes(digit)) {
      ball += 1;
    }
  });

  return { strike, ball };
}

function renderHistory() {
  historyList.innerHTML = history
    .map((item) => `<li>${item.guess} → ${item.strike}S ${item.ball}B</li>`)
    .join("");
}

async function loadResults() {
  const res = await fetch("/api/results");
  const data = await res.json();
  if (!data.ok) {
    resultsEl.innerHTML = "<div class=\"table-row\">불러오기 실패</div>";
    return;
  }
  const items: ResultItem[] = data.items;
  resultsEl.innerHTML = items
    .map(
      (item) => `
        <div class="table-row">
          <span>${item.player_name}</span>
          <span>${item.attempts}</span>
          <span>${item.success_status}</span>
          <span>${item.duration_ms}</span>
          <span>${item.created_at_text}</span>
        </div>
      `
    )
    .join("");
}

async function saveResult(successStatus: "성공" | "실패") {
  if (hasSaved) return;

  const playerName = playerNameInput.value.trim() || "익명";
  const durationMs = Date.now() - startTime;

  const res = await fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player_name: playerName,
      attempts,
      success_status: successStatus,
      duration_ms: durationMs,
    }),
  });

  const data = await res.json();
  if (data.ok) {
    hasSaved = true;
    await loadResults();
  } else {
    statusEl.textContent = "저장 실패: " + (data.error ?? "알 수 없는 오류");
  }
}

function finishGame(success: boolean) {
  isFinished = true;
  guessInput.disabled = true;
  guessBtn.disabled = true;
  const status = success ? "성공" : "실패";
  statusEl.textContent = success
    ? `정답! ${attempts}번 만에 맞췄습니다.`
    : `실패! 정답은 ${secret.join("")} 입니다.`;
  saveResult(status);
}

function handleGuess() {
  if (isFinished) return;
  const value = guessInput.value.trim();
  const error = validateGuess(value);
  if (error) {
    statusEl.textContent = error;
    return;
  }

  attempts += 1;
  const { strike, ball } = evaluateGuess(value);
  history.unshift({ guess: value, strike, ball });
  renderHistory();

  if (strike === 4) {
    finishGame(true);
    return;
  }

  if (attempts >= maxAttempts) {
    finishGame(false);
    return;
  }

  statusEl.textContent = `${attempts}번째 도전: ${strike}S ${ball}B`;
  guessInput.value = "";
  guessInput.focus();
}

guessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

newGameBtn.addEventListener("click", () => {
  resetGame();
});

giveUpBtn.addEventListener("click", () => {
  if (isFinished) return;
  finishGame(false);
});

resetGame();
loadResults();
