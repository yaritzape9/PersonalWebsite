const BASE = 'http://localhost:3000';

describe('Payment State Machine', () => {
  let paymentId: string;

  it('creates a payment in PENDING state', async () => {
    const res = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'USD', amount: 49.99 }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.state).toBe('PENDING');
    expect(data.id).toBeDefined();
    expect(data.currency).toBe('USD');
    expect(data.amount).toBe(49.99);
    paymentId = data.id;
  });

  it('advances PENDING → PROCESSING', async () => {
    const res = await fetch(`${BASE}/api/payment/state/${paymentId}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'PROCESSING' }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.state).toBe('PROCESSING');
  });

  it('advances PROCESSING → SUCCESS', async () => {
    const res = await fetch(`${BASE}/api/payment/state/${paymentId}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'SUCCESS' }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.state).toBe('SUCCESS');
  });

  it('rejects invalid transition SUCCESS → PROCESSING', async () => {
    const res = await fetch(`${BASE}/api/payment/state/${paymentId}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'PROCESSING' }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/Cannot transition/);
  });

  it('rejects invalid transition PENDING → SUCCESS (skipping PROCESSING)', async () => {
    // Create a new payment for this test
    const createRes = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'EUR', amount: 20.00 }),
    });
    const fresh = await createRes.json();

    const res = await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'SUCCESS' }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/Cannot transition/);
  });

  it('advances PROCESSING → FAILED', async () => {
    // Create a fresh payment and walk it to PROCESSING
    const createRes = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'USD', amount: 9.99 }),
    });
    const fresh = await createRes.json();

    await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'PROCESSING' }),
    });

    const res = await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'FAILED' }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.state).toBe('FAILED');
  });

  
  it('fetches a payment by id', async () => {
    const createRes = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'USD', amount: 25.00 }),
    });
    const created = await createRes.json();

    const res = await fetch(`${BASE}/api/payment/state/${created.id}`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(created.id);
    expect(data.state).toBe('PENDING');
  });

  it('returns 404 for unknown payment id', async () => {
    const res = await fetch(`${BASE}/api/payment/state/non-existent-id`);
    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid state value', async () => {
    const createRes = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'USD', amount: 10.00 }),
    });
    const fresh = await createRes.json();

    const res = await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'BLAH' }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it('FAILED is a terminal state', async () => {
    const createRes = await fetch(`${BASE}/api/payment/state/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: 'USD', amount: 10.00 }),
    });
    const fresh = await createRes.json();

    // Walk to FAILED
    await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'PROCESSING' }),
    });
    await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'FAILED' }),
    });

    const res = await fetch(`${BASE}/api/payment/state/${fresh.id}/advance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: 'PROCESSING' }),
    });
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/Cannot transition/);
  });
});