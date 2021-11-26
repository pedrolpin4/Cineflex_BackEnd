import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from "../src/database.js"

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

describe('POST /seats/bookmany', () => {

    afterAll(async () => {
        await connection.query('DELETE FROM buyers_info WHERE seat_id = 1');
        await connection.query("UPDATE session_seats SET is_selected = 'false' WHERE id = 1")
    })

    it('Should return 400 if invalid body', async () => {
        const body = {
            buyers: {id: 2, name: 'pedrin', cpf: '12019'}
        }

        const result = await supertest(app).post('/seats/bookmany')
            .send(body);
            expect(result.status).toEqual(400);
    });

    it('Should return 404 if not existent seat (s)', async () => {
        const body = {
            ids: [4000],
            buyers: [{id: 4000, name: 'pedrin', cpf: '18615158711'}],
        }

        const result = await supertest(app).post('/seats/bookmany')
            .send(body);
            expect(result.status).toEqual(404);
    });

    it('Should return 200 if valid body and existent seat', async () => {
        const body = {
            buyers: [{id: 1, name: 'pedrin', cpf: '18615158711'}]
        }

        const result = await supertest(app).post('/seats/bookmany')
            .send(body);
            expect(result.status).toEqual(201);
    });

    it('Should return 409 if not existent seat (s)', async () => {
        const body = {
            ids: [1],
            buyers: [{id: 1, name: 'pedrin', cpf: '18615158711'}],
        }

        const result = await supertest(app).post('/seats/bookmany')
            .send(body);
            expect(result.status).toEqual(409);
    });
})