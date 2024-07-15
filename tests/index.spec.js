const app = require('../src/app');
const request = require('supertest');


describe('GET /',() => {

    test('Welcome Message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

