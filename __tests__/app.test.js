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

  it('gets all vacations', async () => {
    await Vacations.insert({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    await Vacations.insert({ destination: 'Ohio', startDate: 'Nov 12th', endDate: 'Nov 25th', details: 'thanksgiving' });
    const expectation = [
      { id: expect.any(String), destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' },
      { id: expect.any(String), destination: 'Ohio', startDate: 'Nov 12th', endDate: 'Nov 25th', details: 'thanksgiving' },
    ]
    const res = await request(app)
      .get('/api/v1/vacations');
    expect(res.body).toEqual(expectation);
  });

  it('updates vacation with given id to new info', async () => {
    await Vacations.insert({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .put('/api/v1/vacations/1')
      .send({ startDate: 'APRIL', destination: null, endDate: null, details: null });
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'APRIL', endDate: 'May 20th', details: 'going for anniversary celebration' });
  });

  it('deletes vacation with given id', async () => {
    await Vacations.insert({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .delete('/api/v1/vacations/1');
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const allVacas = await Vacations.getAll();
    expect(allVacas).toEqual([]);
  });


});
