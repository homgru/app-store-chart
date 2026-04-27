# 📊 앱스토어 순위 대시보드

구글 플레이 스토어와 애플 앱스토어의 국가별 인기 앱 순위를 실시간으로 비교하는 웹 대시보드입니다.

![App Store Chart](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

---

## 주요 기능

- **플랫폼 전환** — Google Play / App Store 탭으로 즉시 전환
- **랭킹 타입** — 무료 / 유료 / 매출 순위 선택
- **국가 비교** — 최대 5개 국가를 나란히 비교 (30개국 지원)
- **앱 아이콘** — 아이콘, 앱 이름, 개발사 표시
- **바로 이동** — 앱 클릭 시 해당 스토어 페이지 오픈
- **서버 캐싱** — 1시간 TTL 캐시로 빠른 응답

---

## 기술 스택

### 프론트엔드 (`/client`)
| 기술 | 용도 |
|------|------|
| React 18 | UI 프레임워크 |
| TypeScript | 타입 안전성 |
| Vite | 번들러 / 개발 서버 |

### 백엔드 (`/server`)
| 기술 | 용도 |
|------|------|
| Node.js + Express | API 서버 |
| TypeScript | 타입 안전성 |
| tsx | TypeScript 실행 (개발) |
| google-play-scraper | 구글 플레이 순위 스크래핑 |
| Apple Marketing Tools RSS | 앱스토어 공식 RSS 피드 |

---

## 프로젝트 구조

```
app-store-chart/
├── client/                  # React + Vite 프론트엔드
│   └── src/
│       ├── components/
│       │   ├── PlatformTabs.tsx     # Google Play / App Store 탭
│       │   ├── RankingTabs.tsx      # 무료 / 유료 / 매출 탭
│       │   ├── CountrySelector.tsx  # 국가 선택 드롭다운
│       │   ├── RankingTable.tsx     # 전체 테이블
│       │   └── CountryColumn.tsx   # 국가별 열
│       ├── hooks/
│       │   └── useRankings.ts      # 데이터 패칭 훅
│       └── types.ts                # 공통 타입 정의
│
└── server/                  # Node.js + Express 백엔드
    └── src/
        ├── routes/
        │   ├── apple.ts     # Apple RSS 프록시
        │   └── google.ts    # Google Play 스크래퍼
        ├── cache.ts         # In-memory 캐시 (TTL 1시간)
        └── index.ts         # 서버 진입점
```

---

## 실행 방법

### 요구사항
- Node.js 18 이상
- npm

### 1. 의존성 설치

```bash
# 백엔드
cd server && npm install

# 프론트엔드
cd client && npm install
```

### 2. 서버 실행

터미널 두 개를 열어 각각 실행합니다.

**터미널 1 — 백엔드 (포트 3001)**
```bash
cd server
npx tsx src/index.ts
```

**터미널 2 — 프론트엔드 (포트 5173)**
```bash
cd client
npm run dev
```

### 3. 브라우저 접속

```
http://localhost:5173
```

---

## API 엔드포인트

```
GET /api/apple/:country/:type
GET /api/google/:country/:type
```

| 파라미터 | 값 |
|---------|-----|
| `country` | `kr`, `us`, `jp`, `gb`, `de` 등 ISO 국가 코드 |
| `type` | `top-free`, `top-paid`, `top-grossing` |

**응답 예시**
```json
{
  "apps": [
    {
      "rank": 1,
      "name": "카카오톡",
      "icon": "https://...",
      "appId": "com.kakao.talk",
      "url": "https://...",
      "developer": "Kakao Corporation"
    }
  ],
  "cachedAt": "2026-04-28T10:00:00Z"
}
```

---

## 지원 국가

한국, 미국, 일본, 중국, 영국, 독일, 프랑스, 호주, 캐나다, 브라질, 인도, 멕시코, 러시아, 이탈리아, 스페인, 싱가포르, 대만, 홍콩, 태국, 인도네시아, 베트남, 필리핀, 말레이시아, 터키, 사우디아라비아, UAE, 스웨덴, 네덜란드, 폴란드, 노르웨이
