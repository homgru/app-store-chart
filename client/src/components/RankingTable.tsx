import CountryColumn from './CountryColumn';
import type { CountryRankings } from '../hooks/useRankings';

interface Props {
  countries: string[];
  rankings: Record<string, CountryRankings>;
}

export default function RankingTable({ countries, rankings }: Props) {
  if (countries.length === 0) {
    return (
      <div className="empty-state">
        위의 <strong>+ 국가 추가</strong> 버튼으로 국가를 선택하세요
      </div>
    );
  }

  return (
    <div className="ranking-table">
      {countries.map(code => {
        const data = rankings[code];
        return (
          <CountryColumn
            key={code}
            countryCode={code}
            apps={data?.apps ?? []}
            loading={data?.loading ?? true}
            error={data?.error ?? null}
          />
        );
      })}
    </div>
  );
}
