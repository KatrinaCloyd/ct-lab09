const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('ct-lab09 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('post will create a new vacation in the vacations table', async () => {
    const res = await request(app)
      .post('/api/v1/vacations')
      .send({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    expect(res.body).toEqual({ id: expect.any(String), destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
  });

});
