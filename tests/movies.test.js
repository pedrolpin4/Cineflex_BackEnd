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

describe('GET /movies/:id', () => {
    it('Should return 200 and specific movies info', async () => {
        const result = await supertest(app).get('/movies/1');
            expect(result.status).toEqual(200);
            expect(result.body).toEqual({
                id: expect.any(Number),
                imdbId: expect.any(String),
                image: expect.any(String),
                title: expect.any(String),
                year: expect.any(Number),
                rating: expect.any(Number),
                runningTime: expect.any(Number), 
            })
    });

    it('Should return 404 if not existent movie', async () => {
        const result = await supertest(app).get('/movies/3500');
            expect(result.status).toEqual(404);
    });
})

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