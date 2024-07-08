import request from 'supertest';
import { app } from '../../app';

describe('CurrentUser', () => {
  it('should respond with details about the current user', async () => {
    const signupResponse = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const cookie = signupResponse.get('Set-Cookie');

    const { body } = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie!)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);

    expect(body.currentUser.email).toBe('test@test.com');
  });
});
