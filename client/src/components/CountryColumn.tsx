import type { App } from '../types';
import { COUNTRIES } from '../types';

interface Props {
  countryCode: string;
  apps: App[];
  loading: boolean;
  error: string | null;
}

export default function CountryColumn({ countryCode, apps, loading, error }: Props) {
  const country = COUNTRIES.find(c => c.code === countryCode);

  return (
    <div className="country-column">
      <div className="column-header">
        <span className="country-flag">{country?.flag}</span>
        <span className="country-name">{country?.name ?? countryCode.toUpperCase()}</span>
      </div>
      <div className="column-body">
        {loading && (
          <div className="column-state">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton-row" />
            ))}
          </div>
        )}
        {error && (
          <div className="column-state error">{error}</div>
        )}
        {!loading && !error && apps.map(app => (
          <a
            key={app.rank}
            className="app-row"
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="app-rank">{app.rank}</span>
            <img
              className="app-icon"
              src={app.icon}
              alt={app.name}
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).style.visibility = 'hidden'; }}
            />
            <div className="app-info">
              <span className="app-name">{app.name}</span>
              <span className="app-dev">{app.developer}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
