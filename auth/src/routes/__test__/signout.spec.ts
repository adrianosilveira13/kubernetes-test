import request from 'supertest';
import { app } from '../../app';

describe('Signout', () => {
  it('should clears the cookie after signing out', async () => {
    const signupResponse = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    expect(signupResponse.get('Set-Cookie')).toBeDefined();

    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
