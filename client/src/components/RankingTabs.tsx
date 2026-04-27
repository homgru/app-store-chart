import type { RankingType } from '../types';

interface Props {
  value: RankingType;
  onChange: (v: RankingType) => void;
}

const TABS: { value: RankingType; label: string }[] = [
  { value: 'top-free', label: '무료' },
  { value: 'top-paid', label: '유료' },
  { value: 'top-grossing', label: '매출' },
];

export default function RankingTabs({ value, onChange }: Props) {
  return (
    <div className="ranking-tabs">
      {TABS.map(tab => (
        <button
          key={tab.value}
          className={`tab-btn small ${value === tab.value ? 'active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
