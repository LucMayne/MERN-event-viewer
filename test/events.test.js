const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/events.js');

app.use(router);

// test the /event-homepage route and see if it responds with an error
describe('Test the /event-homepage route', () => {
    test('respond with an error if no token is attached to the request', async () => {
        const response = await request(app)
            .get('/event-homepage');
        // expect a 200 OK
        expect(response.statusCode).toBe(200);
        // expect an object
        expect(typeof response.body).toBe('object');
        // expect the message to be 'No token attached to the request'
        expect(response.body.message).toBe('No token attached to the request');
    });
});
