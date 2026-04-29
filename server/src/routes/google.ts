import { Router, Request, Response } from 'express';
import gplay from 'google-play-scraper';
import * as cache from '../cache';

const router = Router();

const COLLECTION_MAP: Record<string, gplay.collection> = {
  'top-free': gplay.collection.TOP_FREE,
  'top-paid': gplay.collection.TOP_PAID,
  'top-grossing': gplay.collection.GROSSING,
};

router.get('/:country/:type', async (req: Request, res: Response) => {
  const { country, type } = req.params;
  const { category } = req.query as { category?: string };
  const collection = COLLECTION_MAP[type];
  if (!collection) {
    res.status(400).json({ error: 'Invalid type. Use top-free, top-paid, or top-grossing.' });
    return;
  }

  const cacheKey = `google:${country}:${type}:${category ?? 'all'}`;
  const cached = cache.get<object>(cacheKey);
  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const results = await gplay.list({
      collection,
      country,
      num: 50,
      fullDetail: false,
      ...(category ? { category: category as gplay.category } : {}),
    });

    const apps = results.map((app, i) => ({
      rank: i + 1,
      name: app.title,
      icon: app.icon,
      appId: app.appId,
      url: app.url,
      developer: app.developer,
    }));

    const payload = { apps, cachedAt: new Date().toISOString() };
    cache.set(cacheKey, payload);
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Google Play rankings' });
  }
});

export default router;
