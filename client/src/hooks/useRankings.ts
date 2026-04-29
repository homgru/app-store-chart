import { useState, useEffect } from 'react';
import type { App, Platform, RankingType } from '../types';

export interface CountryRankings {
  countryCode: string;
  apps: App[];
  loading: boolean;
  error: string | null;
}

export function useRankings(
  platform: Platform,
  type: RankingType,
  countries: string[],
  category: string
): Record<string, CountryRankings> {
  const [rankings, setRankings] = useState<Record<string, CountryRankings>>({});
  const countriesKey = countries.join(',');

  useEffect(() => {
    if (countries.length === 0) {
      setRankings({});
      return;
    }

    setRankings(
      Object.fromEntries(
        countries.map(code => [code, { countryCode: code, apps: [], loading: true, error: null }])
      )
    );

    countries.forEach(code => {
      const params = platform === 'google' && category
        ? `?category=${encodeURIComponent(category)}`
        : '';
      fetch(`/api/${platform}/${code}/${type}${params}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: { apps: App[] }) => {
          setRankings(prev => ({
            ...prev,
            [code]: { countryCode: code, apps: data.apps, loading: false, error: null },
          }));
        })
        .catch(() => {
          setRankings(prev => ({
            ...prev,
            [code]: { countryCode: code, apps: [], loading: false, error: '데이터를 불러오지 못했습니다' },
          }));
        });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform, type, countriesKey, category]);

  return rankings;
}
