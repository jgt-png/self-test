# 숫자 야구 게임 (TypeScript + PostgreSQL)

## 구성
- `client`: Vite + TypeScript 프론트엔드
- `server`: Express + TypeScript API 서버
- `server/schema.sql`: 결과 저장 테이블 스키마

## 저장 데이터 형식
- `success_status`: `성공` 또는 `실패` (한글 문자열)
- `created_at_text`: `YYYY-MM-DD HH:mm:ss` 형식의 문자열로 저장

## DB 준비
1. PostgreSQL에 데이터베이스 생성
2. 스키마 실행

```sql
CREATE DATABASE number_baseball;
```

```sql
\c number_baseball
\i schema.sql
```

## 서버 실행
```bash
cd server
npm install
# .env 파일을 생성하고 환경변수 입력
# 예시: .env.example 참고
npm run dev
```

### DB 없이 실행 (임시 메모리 저장)
```bash
# Windows PowerShell
$env:NO_DB="true"; npm run dev
```

## 클라이언트 실행
```bash
cd client
npm install
npm run dev
```

## 접속
- 클라이언트: `http://localhost:5173`
- 서버: `http://localhost:3000`

## API
- `GET /api/results`: 최근 결과 50개 조회
- `POST /api/results`: 결과 저장

요청 예시:
```json
{
  "player_name": "홍길동",
  "attempts": 7,
  "success_status": "성공",
  "duration_ms": 45230
}
```
