const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
require('dotenv').config();


beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /reports', () => {
    it('should get all reports', async () => {
        const res = await request(app).get("/reports")
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});