import { Router, Request, Response } from 'express';
import * as cache from '../cache';
import { APPLE_CATEGORIES } from '../../../shared/appleCategories';

const router = Router();
const categoryIds = new Set(APPLE_CATEGORIES.map(category => category.value));

const TYPE_MAP: Record<string, string> = {
  'top-free': 'top-free',
  'top-paid': 'top-paid',
  'top-grossing': 'top-grossing',
};

router.get('/:country/:type', async (req: Request, res: Response) => {
  const { country, type } = req.params;
  const category = req.query.category ?? '';
  if (typeof category !== 'string' || !categoryIds.has(category)) {
    res.status(400).json({ error: 'Invalid Apple category' });
    return;
  }
  const appleType = TYPE_MAP[type];
  if (!appleType) {
    res.status(400).json({ error: 'Invalid type. Use top-free, top-paid, or top-grossing.' });
    return;
  }

  if (type === 'top-grossing') {
    res.status(400).json({ error: 'top-grossing is not supported for Apple App Store' });
    return;
  }

  const cacheKey = `apple:${country}:${type}:${category || 'all'}`;
  const cached = cache.get<object>(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  const feedType = type === 'top-paid' ? 'toppaidapplications' : 'topfreeapplications';
  const url = category
    ? `https://itunes.apple.com/${encodeURIComponent(country)}/rss/${feedType}/limit=50/genre=${category}/json`
    : `https://rss.marketingtools.apple.com/api/v2/${encodeURIComponent(country)}/apps/${appleType}/50/apps.json`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      res.status(502).json({ error: `Apple RSS returned ${response.status}` });
      return;
    }
    const json = await response.json() as { feed?: { results?: AppleApp[]; entry?: AppleCategoryApp | AppleCategoryApp[] } };
    if (!json.feed) throw new Error('Invalid Apple RSS feed');
    const entries = json.feed.entry;
    const results: AppleApp[] = category
      ? (Array.isArray(entries) ? entries : entries ? [entries] : []).map(app => ({
          name: app['im:name'].label,
          artworkUrl100: app['im:image'][app['im:image'].length - 1]?.label ?? '',
          id: app.id.attributes['im:id'],
          url: app.id.label,
          artistName: app['im:artist'].label,
        }))
      : json.feed.results ?? [];

    const apps = results.map((app, i) => ({
      rank: i + 1,
      name: app.name,
      icon: app.artworkUrl100,
      appId: app.id,
      url: app.url,
      developer: app.artistName,
    }));

    const payload = { apps, cachedAt: new Date().toISOString() };
    cache.set(cacheKey, payload);
    res.json(payload);
  } catch (err) {
    console.error('[apple] Failed to fetch rankings:', err);
    res.status(500).json({ error: 'Failed to fetch Apple rankings' });
  }
});

interface AppleApp {
  name: string;
  artworkUrl100: string;
  id: string;
  url: string;
  artistName: string;
}

interface AppleCategoryApp {
  'im:name': { label: string };
  'im:image': { label: string }[];
  'im:artist': { label: string };
  id: { label: string; attributes: { 'im:id': string } };
}

export default router;
