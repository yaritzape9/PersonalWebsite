import { GET } from '@/app/api/projects/route';

describe('GET /api/projects', () => {
  it('returns an array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('each project has correct shape', async () => {
    const res = await GET();
    const data = await res.json();
    data.forEach((p: { title: string; description: string; technologies: string[] }) => {
      expect(p.title).toBeDefined();
      expect(p.description).toBeDefined();
      expect(Array.isArray(p.technologies)).toBe(true);
    });
  });
});