const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  test('returns the API health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});

describe('POST /candidates/validate', () => {
  test.each([
    [0, 'rejected'],
    [49, 'rejected'],
    [50, 'manual_review'],
    [89, 'manual_review'],
    [90, 'approved'],
    [100, 'approved'],
    ['90', 'approved']
  ])('score %p returns %s', async (score, status) => {
    const payload = score === undefined ? {} : { score };

    const response = await request(app)
      .post('/candidates/validate')
      .send(payload)
      .expect(200);

    expect(response.body).toEqual({ status });
  });

  test.each([-1, 101, 'not-a-number', undefined, null])('rejects invalid score %p', async (score) => {
    await request(app)
      .post('/candidates/validate')
      .send({ score })
      .expect(400);
  });
});
