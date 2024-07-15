const app = require("../../src/app");
const request = require("supertest");


describe('Query Log Controller', () => {

    describe('Get all query logs', () => {
        test('Unauthorized request', async () => {
            const response = await request(app).get('/queryLogs');
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).get('/queryLogs').set('Authorization', `Bearer ${token.body.data}`);
            expect(response.body.message).toBe('Query logs retrieved successfully.');
        });
    });

});