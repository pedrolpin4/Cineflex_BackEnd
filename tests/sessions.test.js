import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

describe('GET /movies/:id/sessions', () => {
    it('Should return 200 and specific movies info', async () => {
        const result = await supertest(app).get('/movies/1/sessions');
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                movie: expect.any(Object),
                sessions: expect.any(Array)
            })
    });

    it('Should return 404 if not existent movie', async () => {
        const result = await supertest(app).get('/movies/3500/sessions');
            expect(result.status).toEqual(404);
    });
})
