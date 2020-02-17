'use strict';

const users = require('../userFake');
const { test, trait } = use('Test/Suite')('Auth: Login User and Refresh Token');
trait('Test/ApiClient');
trait('Auth/Client');

let token;

test('login: user position 01 - email', async ({ client }) => {
  const user = users[1];

  const response = await client
    .post('api/v1/auth/login')
    .send({
      login: user.email,
      password: user.password,
    })
    .end();

  response.assertStatus(200);

  token = response.body.data;
});

test('refresh token: not auth', async ({ client }) => {
  const resp = await client
    .post('/api/v1/auth/refresh-token')
    .send({
      refresh_token: token.refreshToken,
    })
    .end();

  resp.assertStatus(401);
});

test('refresh token: auth', async ({ client }) => {
  const resp = await client
    .post('/api/v1/auth/refresh-token')
    .header('Authorization', `${token.type} ${token.token}`)
    .send({
      refresh_token: token.refreshToken,
    })
    .end();

  resp.assertStatus(200);
});

test('login: user position 01 - username', async ({ client }) => {
  const user = users[1];

  const response = await client
    .post('api/v1/auth/login')
    .send({
      login: user.username,
      password: user.password,
    })
    .end();

  response.assertStatus(200);
});

test('login: user position 02 - email - not active', async ({ client }) => {
  const user = users[2];

  const response = await client
    .post('api/v1/auth/login')
    .send({
      login: user.email,
      password: user.password,
    })
    .end();

  response.assertStatus(401);
});

test('login: user position 03 - username - not created', async ({ client }) => {
  const user = users[3];

  const response = await client
    .post('api/v1/auth/login')
    .send({
      login: user.username,
      password: user.password,
    })
    .end();

  response.assertStatus(404);
});
