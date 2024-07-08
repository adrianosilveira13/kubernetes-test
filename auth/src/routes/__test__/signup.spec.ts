import request from 'supertest';
import { app } from '../../app';

describe('Signup', () => {
  it('should return 201 on successful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('should return 400 if email is invalid', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'invalid_email',
        password: 'password',
      })
      .expect(400);
  });

  const invalidPasswords = ['p', '', null, ' ', undefined];
  it.each(invalidPasswords)(
    'should return 400 if password is invalid',
    async (password) => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'invalid_email',
          password: password,
        })
        .expect(400);
    }
  );

  const invalidBodies = [undefined, null, {}, []];
  it.each(invalidBodies)(
    'should return 400 if there is no body',
    async (body) => {
      await request(app)
        .post('/api/users/signup')
        .send(body as any)
        .expect(400);
    }
  );

  it('should not accept duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'valid@email.com',
        password: 'password',
      })
      .expect(201);
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'valid@email.com',
        password: 'password',
      })
      .expect(400);
  });

  it('should sets a cookie after successfull signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'valid@email.com',
        password: 'password',
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
