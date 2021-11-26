import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

describe('GET /sessions/:id/seats', () => {
    it('Should return 200 and specific movies info', async () => {
        const result = await supertest(app).get('/sessions/1/seats');
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                movie: expect.any(Object),
                session: expect.any(Object),
                seats: expect.any(Array),
            })
    });

    it('Should return 404 if not existent session', async () => {
        const result = await supertest(app).get('/sessions/32000/seats');
            expect(result.status).toEqual(404);
    });
})