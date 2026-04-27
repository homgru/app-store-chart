import { Router, Request, Response } from 'express';
import * as cache from '../cache';

const router = Router();

const TYPE_MAP: Record<string, string> = {
  'top-free': 'top-free',
  'top-paid': 'top-paid',
  'top-grossing': 'top-grossing',
};

router.get('/:country/:type', async (req: Request, res: Response) => {
  const { country, type } = req.params;
  const appleType = TYPE_MAP[type];
  if (!appleType) {
    res.status(400).json({ error: 'Invalid type. Use top-free, top-paid, or top-grossing.' });
    return;
  }

  const cacheKey = `apple:${country}:${type}`;
  const cached = cache.get<object>(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  const url = `https://rss.marketingtools.apple.com/api/v2/${country}/apps/${appleType}/50/apps.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(502).json({ error: `Apple RSS returned ${response.status}` });
      return;
    }
    const json = await response.json() as { feed?: { results?: AppleApp[] } };
    const results = json?.feed?.results ?? [];

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

export default router;
