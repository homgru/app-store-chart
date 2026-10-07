import { GOOGLE_CATEGORIES } from '../types';
import { APPLE_CATEGORIES } from '../../../shared/appleCategories';
import type { Platform } from '../types';

interface Props {
  value: string;
  platform: Platform;
  onChange: (v: string) => void;
}

export default function CategorySelector({ value, platform, onChange }: Props) {
  const categories = platform === 'apple' ? APPLE_CATEGORIES : GOOGLE_CATEGORIES;
  const groups = [...new Set(categories.map(cat => cat.group).filter(Boolean))];

  return (
    <div className="category-selector">
      <label className="category-label" htmlFor="store-category">카테고리</label>
      <select
        className="category-select"
        id="store-category"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {categories.filter(cat => !cat.group).map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
        {groups.map(group => (
          <optgroup key={group} label={group}>
            {categories.filter(cat => cat.group === group).map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
