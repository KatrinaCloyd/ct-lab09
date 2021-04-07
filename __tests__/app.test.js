const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Vacations = require('../lib/models/Vacations');
const VacationService = require('../lib/services/VacationService');

describe('ct-lab09 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('post will create a new vacation in the vacations table', async () => {
    const res = await request(app)
      .post('/api/v1/vacations')
      .send({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    expect(res.body).toEqual({ id: expect.any(String), destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration', photo: expect.any(String) });
  });

  it('get vacation by id 1 will return correct vacation', async () => {
    await VacationService.new({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .get('/api/v1/vacations/1');
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration', photo: expect.any(String) });
  });

  it('gets all vacations', async () => {
    await VacationService.new({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    await VacationService.new({ destination: 'Ohio', startDate: 'Nov 12th', endDate: 'Nov 25th', details: 'thanksgiving' });
    const expectation = [
      { id: expect.any(String), destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration', photo: expect.any(String) },
      { id: expect.any(String), destination: 'Ohio', startDate: 'Nov 12th', endDate: 'Nov 25th', details: 'thanksgiving', photo: expect.any(String) },
    ];
    const res = await request(app)
      .get('/api/v1/vacations');
    expect(res.body).toEqual(expectation);
  });

  it('updates vacation with given id to new info', async () => {
    await VacationService.new({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .put('/api/v1/vacations/1')
      .send({ startDate: 'APRIL', destination: null, endDate: null, details: null, photo: null });
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'APRIL', endDate: 'May 20th', details: 'going for anniversary celebration', photo: expect.any(String) });
  });

  it('deletes vacation with given id', async () => {
    await VacationService.new({ destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration' });
    const res = await request(app)
      .delete('/api/v1/vacations/1');
    expect(res.body).toEqual({ id: '1', destination: 'Hawaii', startDate: 'May 5th', endDate: 'May 20th', details: 'going for anniversary celebration', photo: expect.any(String) });
    const allVacas = await Vacations.getAll();
    expect(allVacas).toEqual([]);
  });

  it('will hit outside api and return a link to an image', async () => {
    const res = await request(app)
      .get('/api/v1/vacations/pic')
      .send({ destination: 'hawaii' });
    expect(res.text).toEqual(expect.any(String));
  });


});
