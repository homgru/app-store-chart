export interface Category {
  value: string;   // google-play-scraper category key (e.g. 'GAME') or '' for all
  label: string;
  group?: string;  // 그룹 헤더 (optgroup용)
}

export const GOOGLE_CATEGORIES: Category[] = [
  { value: '',                  label: '전체' },
  { value: 'GAME',              label: '게임 전체',     group: '게임' },
  { value: 'GAME_ACTION',       label: '├ 액션',        group: '게임' },
  { value: 'GAME_ADVENTURE',    label: '├ 어드벤처',    group: '게임' },
  { value: 'GAME_ARCADE',       label: '├ 아케이드',    group: '게임' },
  { value: 'GAME_CASUAL',       label: '├ 캐주얼',      group: '게임' },
  { value: 'GAME_PUZZLE',       label: '├ 퍼즐',        group: '게임' },
  { value: 'GAME_RACING',       label: '├ 레이싱',      group: '게임' },
  { value: 'GAME_ROLE_PLAYING', label: '├ RPG',         group: '게임' },
  { value: 'GAME_SIMULATION',   label: '├ 시뮬레이션',  group: '게임' },
  { value: 'GAME_STRATEGY',     label: '└ 전략',        group: '게임' },
  { value: 'SOCIAL',            label: '소셜',           group: '앱' },
  { value: 'COMMUNICATION',     label: '커뮤니케이션',   group: '앱' },
  { value: 'ENTERTAINMENT',     label: '엔터테인먼트',   group: '앱' },
  { value: 'MUSIC_AND_AUDIO',   label: '음악',           group: '앱' },
  { value: 'PHOTOGRAPHY',       label: '사진',           group: '앱' },
  { value: 'VIDEO_PLAYERS',     label: '동영상',         group: '앱' },
  { value: 'PRODUCTIVITY',      label: '생산성',         group: '앱' },
  { value: 'TOOLS',             label: '도구',           group: '앱' },
  { value: 'SHOPPING',          label: '쇼핑',           group: '앱' },
  { value: 'FINANCE',           label: '금융',           group: '앱' },
  { value: 'EDUCATION',         label: '교육',           group: '앱' },
  { value: 'HEALTH_AND_FITNESS',label: '건강/피트니스',  group: '앱' },
  { value: 'TRAVEL_AND_LOCAL',  label: '여행',           group: '앱' },
  { value: 'NEWS_AND_MAGAZINES',label: '뉴스',           group: '앱' },
  { value: 'SPORTS',            label: '스포츠',         group: '앱' },
  { value: 'FOOD_AND_DRINK',    label: '음식/음료',      group: '앱' },
  { value: 'LIFESTYLE',         label: '라이프스타일',   group: '앱' },
  { value: 'BUSINESS',          label: '비즈니스',       group: '앱' },
];

export interface App {
  rank: number;
  name: string;
  icon: string;
  appId: string;
  url: string;
  developer: string;
}

export type Platform = 'apple' | 'google';
export type RankingType = 'top-free' | 'top-paid' | 'top-grossing';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'kr', name: '한국', flag: '🇰🇷' },
  { code: 'us', name: '미국', flag: '🇺🇸' },
  { code: 'jp', name: '일본', flag: '🇯🇵' },
  { code: 'cn', name: '중국', flag: '🇨🇳' },
  { code: 'gb', name: '영국', flag: '🇬🇧' },
  { code: 'de', name: '독일', flag: '🇩🇪' },
  { code: 'fr', name: '프랑스', flag: '🇫🇷' },
  { code: 'au', name: '호주', flag: '🇦🇺' },
  { code: 'ca', name: '캐나다', flag: '🇨🇦' },
  { code: 'br', name: '브라질', flag: '🇧🇷' },
  { code: 'in', name: '인도', flag: '🇮🇳' },
  { code: 'mx', name: '멕시코', flag: '🇲🇽' },
  { code: 'ru', name: '러시아', flag: '🇷🇺' },
  { code: 'it', name: '이탈리아', flag: '🇮🇹' },
  { code: 'es', name: '스페인', flag: '🇪🇸' },
  { code: 'sg', name: '싱가포르', flag: '🇸🇬' },
  { code: 'tw', name: '대만', flag: '🇹🇼' },
  { code: 'hk', name: '홍콩', flag: '🇭🇰' },
  { code: 'th', name: '태국', flag: '🇹🇭' },
  { code: 'id', name: '인도네시아', flag: '🇮🇩' },
  { code: 'vn', name: '베트남', flag: '🇻🇳' },
  { code: 'ph', name: '필리핀', flag: '🇵🇭' },
  { code: 'my', name: '말레이시아', flag: '🇲🇾' },
  { code: 'tr', name: '터키', flag: '🇹🇷' },
  { code: 'sa', name: '사우디', flag: '🇸🇦' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪' },
  { code: 'se', name: '스웨덴', flag: '🇸🇪' },
  { code: 'nl', name: '네덜란드', flag: '🇳🇱' },
  { code: 'pl', name: '폴란드', flag: '🇵🇱' },
  { code: 'no', name: '노르웨이', flag: '🇳🇴' },
];
