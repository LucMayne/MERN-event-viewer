const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/users.js'); 

app.use(router);

// snapshot test
describe('Test the /login route', () => {
    test('respond with an error if incorrect info is entered', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'incorrect', password: 'incorrect' });
        // expect a 401 
        expect(response.statusCode).toBe(401);
        // create a snapshot of the response body
        expect(response.body).toMatchSnapshot();
    });
});
