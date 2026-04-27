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
