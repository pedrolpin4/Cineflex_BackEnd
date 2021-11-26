import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';

describe('GET /movies/:id/sessions', () => {
    it('Should return 200 and specific movies info', async () => {
        const result = await supertest(app).get('/movies/1/sessions');
            expect(result.status).toEqual(200);
            expect(result.body[0]).toEqual({
                id: expect.any(Number),
                hour: expect.any(String),
                day: expect.any(String),
                weekday: expect.any(Number),
                movie: {
                    title: expect.any(String),
                    image: expect.any(String),
                }
            })
    });

    it('Should return 404 if not existent movie', async () => {
        const result = await supertest(app).get('/movies/3500/sessions');
            expect(result.status).toEqual(404);
    });
})
