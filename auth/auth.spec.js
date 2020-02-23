const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');

//Register Tests

describe('test register', () => {
    it('register works', async() => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({username: "John", password: "Doe"})
        expect(res.status).toBe(201)
    });
    it('return json', async() => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({username: "Jane", password: "Doe"})
        expect(res.type).toBe("application/json");
    });
    beforeEach(async() => {
        await db("users").truncate();
    })
})

//Login tests

describe('login environment', () => {
    it('return registered user', async() => {
        request(server)
            .post('/api/auth/register')
            .send({username: "Bill", password: "Joe"})
        .set('Accept', "application/json").expect(201);
    });

    it('success login', async() => {
        request(server)
            .post('/api/auth/login')
            .send({username: "Joe", password: "Bill"})
        .set('Accept', 'application/json')
        .expect(200)
    });
})