import type { Platform } from '../types';

interface Props {
  value: Platform;
  onChange: (v: Platform) => void;
}

const TABS: { value: Platform; label: string; icon: string }[] = [
  { value: 'google', label: 'Google Play', icon: '▶' },
  { value: 'apple', label: 'App Store', icon: '' },
];

export default function PlatformTabs({ value, onChange }: Props) {
  return (
    <div className="platform-tabs">
      {TABS.map(tab => (
        <button
          key={tab.value}
          className={`tab-btn ${value === tab.value ? 'active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
