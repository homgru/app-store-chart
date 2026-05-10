# 📊 앱스토어 순위 대시보드

구글 플레이 스토어와 애플 앱스토어의 국가별 인기 앱 순위를 실시간으로 비교하는 웹/Electron 데스크톱 대시보드입니다.

![App Store Chart](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5%2F6-3178C6?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js) ![Electron](https://img.shields.io/badge/Electron-41-47848F?logo=electron)

---

## 주요 기능

- **플랫폼 전환** — Google Play / App Store 탭으로 즉시 전환
- **랭킹 타입** — 무료 / 유료 / 매출 순위 선택
- **국가 비교** — 최대 5개 국가를 나란히 비교 (30개국 지원)
- **앱 아이콘** — 아이콘, 앱 이름, 개발사 표시
- **바로 이동** — 앱 클릭 시 해당 스토어 페이지 오픈
- **서버 캐싱** — 1시간 TTL 캐시로 빠른 응답
- **Electron 독립 앱** — 로컬 Express 서버와 React 정적 빌드를 함께 패키징

---

## 기술 스택

### 프론트엔드 (`/client`)
| 기술 | 용도 |
|------|------|
| React 19 | UI 프레임워크 |
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

### 데스크톱 (`/electron`)
| 기술 | 용도 |
|------|------|
| Electron 41.5.0 | macOS/Windows 독립 앱 런타임 |
| electron-builder | 앱 패키징 / DMG 생성 |
| esbuild | Electron main process 번들링 |

---

## 프로젝트 구조

```
app-store-chart/
├── electron/
│   └── main.ts             # Electron main process
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
├── server/                  # Node.js + Express 백엔드
│   └── src/
│       ├── routes/
│       │   ├── apple.ts     # Apple RSS 프록시
│       │   └── google.ts    # Google Play 스크래퍼
│       ├── cache.ts         # In-memory 캐시 (TTL 1시간)
│       └── index.ts         # 서버 진입점
└── package.json             # Electron 개발/빌드/패키징 스크립트
```

---

## 실행 방법

### 요구사항
- Node.js 18 이상
- npm

### 1. 의존성 설치

```bash
# 루트: Electron, Express 서버, 패키징 도구
npm install

# 클라이언트: React/Vite
npm install --prefix client
```

`server/package.json`은 백엔드만 단독으로 다룰 때 사용할 수 있습니다. Electron 개발/패키징은 루트 `package.json` 스크립트를 기준으로 실행합니다.

### 2. Electron 개발 모드

```bash
npm run dev
```

위 명령은 Express 서버(`3001`), Vite 개발 서버(`5173`), Electron 앱을 함께 실행합니다.

### 3. 웹 개발 모드

브라우저에서만 확인하려면 터미널 두 개를 열어 각각 실행합니다.

```bash
npm run dev:server
```

```bash
npm run dev:client
```

브라우저 접속:

```
http://localhost:5173
```

### 4. 빌드

```bash
npm run build
```

### 5. 데스크톱 앱 패키징

```bash
npm run dist
```

macOS arm64 빌드 결과:

```bash
open release/mac-arm64/app-store-chart.app
```

직접 실행으로 로그를 볼 수도 있습니다.

```bash
release/mac-arm64/app-store-chart.app/Contents/MacOS/app-store-chart
```

패키지된 앱은 자체 Express 서버를 `http://localhost:3001`에 띄우고, `client/dist` 정적 파일과 `/api/*` 엔드포인트를 함께 제공합니다.

---

## Electron 패키징 메모

- `electron/main.ts`는 `BrowserWindow` 참조를 main process 전역에 유지합니다. 창이 닫히면 참조를 `null`로 비우고, macOS `activate` 이벤트에서는 기존 창을 focus하거나 새 창을 만듭니다.
- 프로덕션 모드에서는 `startServer()`가 반환하는 HTTP server 핸들을 보관하고, 앱 종료 시 `server.close()`로 정리합니다.
- 패키지된 앱의 정적 파일 경로는 `app.getAppPath()/client/dist`를 사용합니다. `asar: true` 패키징에서도 React 빌드를 안정적으로 찾기 위한 설정입니다.
- macOS 번들 내부 이름은 ASCII로 유지합니다. `productName`은 `App Store Chart`, `executableName`은 `app-store-chart`이고, Finder 표시명만 `CFBundleDisplayName: 앱스토어 순위`로 설정합니다.
- macOS Electron helper app 이름을 한글 제품명으로 생성하면 일부 환경에서 `app.whenReady()` 이전 네이티브 크래시가 발생할 수 있으므로 `productName`을 한글로 되돌리지 않습니다.

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
