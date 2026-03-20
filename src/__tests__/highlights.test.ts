import { GET } from '@/app/api/highlights/route';

describe('GET /api/highlights', () => {
  it('returns an array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('each highlight has correct shape', async () => {
    const res = await GET();
    const data = await res.json();
    data.forEach((h: { title: string; description: string }) => {
      expect(h.title).toBeDefined();
      expect(h.description).toBeDefined();
    });
  });
});