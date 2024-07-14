const app = require('../src/app');
const request = require('supertest');


describe('GET /',() => {

    test('It should be logged auth', async () => {
        const response = await request(app).get('/');
        
        expect(response.body.message).toEqual('Logged out');
        expect(response.statusCode).toBe(200);
    });
});


describe('GET /products',() => {

    test('It should return 200', async () => {
        const response = await request(app).get('/products');
        
        expect(response.statusCode).toBe(200);
    });
});

