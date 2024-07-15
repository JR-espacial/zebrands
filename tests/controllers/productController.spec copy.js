const app = require("../../src/app");
const request = require("supertest");

describe('Product Controller', () => {

    describe('getAllProducts', () => {
        test('It should return 200', async () => {
            const response = await request(app).get('/products');
            
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
    
    let productId
    describe('CreateProduct', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).post('/products').send({
                name: 'Product 1',
                price: 100
            });
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).post('/products').send({
                name: "Sample Product",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                price: 29.99,
                sku: "ABC123PAP",
                brand: "Sample Brand"
              }).set('Authorization', `Bearer ${token.body.data}`);

            productId= response.body.data.id;
            expect(response.statusCode).toBe(200);
        });
    });

    describe('UpdateProduct', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).put('/products/1').send({
                name: 'Product 1',
                price: 100
            });
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).put('/products/1').send({
                price: 45.99
              }).set('Authorization', `Bearer ${token.body.data}`);

           

            expect(response.statusCode).toBe(200);
        });
    });

    describe('DeleteProduct', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).delete('/products/1').send({
                name: 'Product 1',
                price: 100
            });
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).delete('/products/' + productId ).send({

            }).set('Authorization', `Bearer ${token.body.data}`);

            expect(response.statusCode).toBe(200);
        });
    });
});