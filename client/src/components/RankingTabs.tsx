import type { Platform, RankingType } from '../types';

interface Props {
  value: RankingType;
  platform: Platform;
  onChange: (v: RankingType) => void;
}

const TABS: { value: RankingType; label: string; appleOnly?: false }[] = [
  { value: 'top-free', label: '무료' },
  { value: 'top-paid', label: '유료' },
  { value: 'top-grossing', label: '매출' },
];

export default function RankingTabs({ value, platform, onChange }: Props) {
  return (
    <div className="ranking-tabs">
      {TABS.map(tab => {
        const disabled = tab.value === 'top-grossing' && platform === 'apple';
        return (
          <button
            key={tab.value}
            className={`tab-btn small ${value === tab.value ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => !disabled && onChange(tab.value)}
            title={disabled ? 'App Store는 매출 순위를 제공하지 않습니다' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
