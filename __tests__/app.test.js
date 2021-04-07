const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Vacations = require('../lib/models/Vacations');

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

  it('get vacation by id 1 will return correct vacation', async () => {
    await Vacations.insert({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .get('/api/v1/vacations/1');
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
  });

});
