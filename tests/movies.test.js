import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

describe('GET /movies', () => {
  it('Should return 200 and specific movies info', async () => {
    const result = await supertest(app).get('/movies');
        expect(result.status).toEqual(200);
        expect(result.body[0]).toEqual({
            id: expect.any(Number),
            image: expect.any(String),
            title: expect.any(String)
        })
  });
});
