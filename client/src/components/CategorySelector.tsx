import { GOOGLE_CATEGORIES } from '../types';
import type { Platform } from '../types';

interface Props {
  value: string;
  platform: Platform;
  onChange: (v: string) => void;
}

export default function CategorySelector({ value, platform, onChange }: Props) {
  const disabled = platform === 'apple';

  return (
    <div
      className={`category-selector ${disabled ? 'disabled' : ''}`}
      title={disabled ? 'App Store는 카테고리별 순위를 제공하지 않습니다' : undefined}
    >
      <label className="category-label">카테고리</label>
      <select
        className="category-select"
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
      >
        {GOOGLE_CATEGORIES.map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
