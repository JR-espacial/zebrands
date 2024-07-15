const app = require("../../src/app");
const request = require("supertest");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getRandomEmail() {
    const randomString = Math.random().toString(36).substring(7); // Generates a random alphanumeric string
    return `test.${randomString}@example.com`; // Replace example.com with your desired domain
}


describe('Admin Controller', () => {

    //get all admin users
    describe('Get all admin users', () => {
        test('Unauthorized request', async () => {
            const response = await request(app).get('/admins');
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).get('/admins').set('Authorization', `Bearer ${token.body.data}`);
            expect(response.statusCode).toBe(200);
        });
    });

    //create admin user
    let adminId
    describe('Create admin user', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).post('/admins').send({
                email: 'jorge@gmail.com',
                password: '123456'
            });
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).post('/admins').send({
                email: getRandomEmail(),
                password: 'admin123!#'
            }).set('Authorization', `Bearer ${token.body.data}`);            
            expect(response.statusCode).toBe(200);
        });
    });

    //update admin user
    describe('Update admin user', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).put('/admins/1').send({
                email: getRandomEmail(),
            });
            expect(response.statusCode).toBe(401);
        });


        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            const response = await request(app).put(`/admins/1`).send({
                email: getRandomEmail(),
            }).set('Authorization', `Bearer ${token.body.data}`);

            expect(response.statusCode).toBe(200);
        });
    });

    //delete admin user
    describe('Delete admin user', () => {

        test('Unauthorized request', async () => {
            const response = await request(app).delete(`/admins/${adminId}`).send({});
            expect(response.statusCode).toBe(401);
        });

        test('Authorized', async () => {
            //get Bearear token
            const token = await request(app).post('/getToken').send({});

            //get latest admin user created from prisma
            const admin = await prisma.admin.findFirst({
                orderBy: {
                    id: 'desc'
                }
            });
            adminId = admin.id;

            const response = await request(app).delete(`/admins/${adminId}`).send({}).set('Authorization', `Bearer ${token.body.data}`);
            expect(response.body.status).toBe('success');

            console.log(response.body);
        });
    });

});