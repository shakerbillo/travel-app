const request = require('supertest');
const app = require('../server/server');

describe('GET /all', () => {
  test('should return the projectData object', async () => {

    const response = await request(app).get('/all');
    expect(response.status).toBe(200);

  });
});