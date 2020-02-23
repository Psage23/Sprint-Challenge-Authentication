const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');

describe('root', () => {
    test("testing environment", () => {
        expect(process.env.DB_ENV).toBe("testing");
    })
})

describe('test register', () => {
    
})