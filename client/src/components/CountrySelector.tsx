import { useState, useRef, useEffect } from 'react';
import { COUNTRIES } from '../types';
import type { Country } from '../types';

interface Props {
  selected: string[];
  onAdd: (code: string) => void;
  onRemove: (code: string) => void;
  max?: number;
}

export default function CountrySelector({ selected, onAdd, onRemove, max = 5 }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const available = COUNTRIES.filter(
    c => !selected.includes(c.code) &&
      (c.name.includes(query) || c.code.includes(query.toLowerCase()) || c.flag.includes(query))
  );

  const selectedCountries = selected
    .map(code => COUNTRIES.find(c => c.code === code))
    .filter((c): c is Country => c !== undefined);

  return (
    <div className="country-selector">
      <div className="selected-tags">
        {selectedCountries.map(c => (
          <span key={c.code} className="country-tag">
            {c.flag} {c.name}
            <button className="tag-remove" onClick={() => onRemove(c.code)}>✕</button>
          </span>
        ))}
        {selected.length < max && (
          <div className="add-country" ref={ref}>
            <button className="add-btn" onClick={() => setOpen(o => !o)}>
              + 국가 추가
            </button>
            {open && (
              <div className="country-dropdown">
                <input
                  className="country-search"
                  placeholder="국가 검색..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoFocus
                />
                <ul className="country-list">
                  {available.length === 0 && (
                    <li className="country-item empty">결과 없음</li>
                  )}
                  {available.map(c => (
                    <li
                      key={c.code}
                      className="country-item"
                      onClick={() => { onAdd(c.code); setOpen(false); setQuery(''); }}
                    >
                      {c.flag} {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
