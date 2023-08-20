const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/events.js');

app.use(router);

// snapshot test
describe('Test the /event-homepage route', () => {
    test('respond with an error if no token is attached to the request', async () => {
        const response = await request(app)
            .get('/event-homepage');
        // expect a 200 OK
        expect(response.statusCode).toBe(200);
        // create a snapshot of the response body
        expect(response.body).toMatchSnapshot();
    });
});
