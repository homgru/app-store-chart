import { useState } from 'react';
import PlatformTabs from './components/PlatformTabs';
import RankingTabs from './components/RankingTabs';
import CountrySelector from './components/CountrySelector';
import RankingTable from './components/RankingTable';
import { useRankings } from './hooks/useRankings';
import type { Platform, RankingType } from './types';

const DEFAULT_COUNTRIES = ['kr', 'us', 'jp'];

export default function App() {
  const [platform, setPlatform] = useState<Platform>('google');
  const [rankingType, setRankingType] = useState<RankingType>('top-free');
  const [countries, setCountries] = useState<string[]>(DEFAULT_COUNTRIES);

  const rankings = useRankings(platform, rankingType, countries);

  function handlePlatformChange(p: Platform) {
    setPlatform(p);
    if (p === 'apple' && rankingType === 'top-grossing') {
      setRankingType('top-free');
    }
  }

  function addCountry(code: string) {
    setCountries(prev => prev.includes(code) ? prev : [...prev, code]);
  }

  function removeCountry(code: string) {
    setCountries(prev => prev.filter(c => c !== code));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">📊 앱스토어 순위</h1>
        <div className="controls">
          <PlatformTabs value={platform} onChange={handlePlatformChange} />
          <RankingTabs value={rankingType} platform={platform} onChange={setRankingType} />
        </div>
        <CountrySelector
          selected={countries}
          onAdd={addCountry}
          onRemove={removeCountry}
        />
      </header>
      <main className="app-main">
        <RankingTable countries={countries} rankings={rankings} />
      </main>
    </div>
  );
}
