import assert from 'node:assert/strict';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import test from 'node:test';
import express from 'express';
import appleRouter from './apple';

test('Apple category rankings use category feeds and isolated caches', async () => {
  const app = express();
  app.use('/api/apple', appleRouter);
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api/apple/kr`;
  const originalFetch = globalThis.fetch;
  const upstreamUrls: string[] = [];
  let upstream: unknown;
  let status = 200;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.startsWith(base)) return originalFetch(input, init);
    upstreamUrls.push(url);
    return new Response(JSON.stringify(upstream), { status });
  };

  const entry = {
    'im:name': { label: 'Category app' },
    'im:image': [{ label: 'small.png' }, { label: 'large.png' }],
    'im:artist': { label: 'Developer' },
    id: { label: 'https://apps.apple.com/kr/app/id123', attributes: { 'im:id': '123' } },
  };

  try {
    upstream = { feed: { entry: [entry] } };
    const free = await fetch(`${base}/top-free?category=6007`);
    assert.equal(free.status, 200);
    const freeData = await free.json();
    assert.deepEqual(freeData.apps, [{
      rank: 1, name: 'Category app', icon: 'large.png', appId: '123',
      url: entry.id.label, developer: 'Developer',
    }]);
    assert.match(upstreamUrls[0], /topfreeapplications\/limit=50\/genre=6007\/json$/);

    await fetch(`${base}/top-free?category=6007`);
    assert.equal(upstreamUrls.length, 1);

    upstream = { feed: { entry } };
    const paid = await (await fetch(`${base}/top-paid?category=6007`)).json();
    assert.equal(paid.apps.length, 1);
    assert.match(upstreamUrls[1], /toppaidapplications/);

    upstream = { feed: { entry: [] } };
    const other = await (await fetch(`${base}/top-free?category=6017`)).json();
    assert.deepEqual(other.apps, []);
    assert.equal(upstreamUrls.length, 3);

    upstream = { feed: { results: [{
      name: 'Overall app', artworkUrl100: 'overall.png', id: '456',
      url: 'https://apps.apple.com/kr/app/id456', artistName: 'Overall developer',
    }] } };
    const all = await (await fetch(`${base}/top-free`)).json();
    assert.equal(all.apps[0].name, 'Overall app');
    assert.match(upstreamUrls[3], /rss.marketingtools.apple.com/);

    for (const query of ['category=GAME', 'category=9999', 'category=6007&category=6017']) {
      assert.equal((await fetch(`${base}/top-free?${query}`)).status, 400);
    }
    assert.equal((await fetch(`${base}/top-grossing?category=6007`)).status, 400);
    assert.equal(upstreamUrls.length, 4);

    status = 503;
    assert.equal((await fetch(`${base}/top-free?category=6000`)).status, 502);
    status = 200;
    upstream = { feed: { entry: [entry] } };
    const retry = await (await fetch(`${base}/top-free?category=6000`)).json();
    assert.equal(retry.apps.length, 1);
    assert.equal(upstreamUrls.length, 6);
  } finally {
    globalThis.fetch = originalFetch;
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
