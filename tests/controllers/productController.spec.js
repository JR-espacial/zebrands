const app = require("../../src/app");
const request = require("supertest");

describe('Product Controller', () => {

    describe('getAllProducts', () => {
        test('It should return 200', async () => {
            const response = await request(app).get('/products');
            console.log(response);
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toBeInstanceOf(Array);
        });
    });

    describe('getProduct', () => {
        test('It should return 200', async () => {
            const response = await request(app).get('/products/1');
            expect(response.statusCode).toBe(200);
        });
    });
});