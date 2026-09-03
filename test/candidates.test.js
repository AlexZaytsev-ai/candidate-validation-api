const request = require('supertest');
const app = require('../src/app');

describe('POST /candidates/validate', () => {
  test.each([
    [0, 'manual_review'],
    [89, 'manual_review'],
    [90, 'approved'],
    [100, 'approved'],
    ['90', 'approved'],
    [undefined, 'manual_review'],
    [null, 'manual_review']
  ])('score %p returns %s', async (score, status) => {
    const payload = score === undefined ? {} : { score };

    const response = await request(app)
      .post('/candidates/validate')
      .send(payload)
      .expect(200);

    expect(response.body).toEqual({ status });
  });

  test.each([-1, 101, 'not-a-number'])('rejects invalid score %p', async (score) => {
    await request(app)
      .post('/candidates/validate')
      .send({ score })
      .expect(400);
  });
});
