import { GET } from '@/app/api/skills/route';

describe('GET /api/skills', () => {
  it('returns an array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('each skill category has correct shape', async () => {
    const res = await GET();
    const data = await res.json();
    data.forEach((s: { category: string; skills: string[] }) => {
      expect(s.category).toBeDefined();
      expect(Array.isArray(s.skills)).toBe(true);
    });
  });
});