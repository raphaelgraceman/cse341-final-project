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

/* Return All staff */
describe('GET /staff', () => {
    it('should get all staff', async () => {
        const res = await request(app).get("/staff")
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});



