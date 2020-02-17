'use strict';

const { test, trait } = use('Test/Suite')('Auth: Create User and Confirm');
const User = use('App/Models/User');
const users = require('../userFake');
trait('Test/ApiClient');

test('create user: position 01 Array users', async ({ client }) => {
  const user = users[0];

  const response = await client
    .post('/api/v1/auth/register')
    .field('username', user.username)
    .field('email', user.email)
    .field('password', user.password)
    .field('password_confirmation', user.password)
    .end();

  response.assertStatus(201);
});

test('confirm user: position 01 array', async ({ client }) => {
  const dataUser = users[0];

  const user = await User.findBy('email', dataUser.email);

  const response = await client
    .post('/api/v1/auth/register-confirm')
    .field('hash', user.token)
    .end();

  response.assertStatus(200);
});

test('create user: position 02 Array users', async ({ client }) => {
  const user = users[1];

  const response = await client
    .post('/api/v1/auth/register')
    .field('username', user.username)
    .field('email', user.email)
    .field('password', user.password)
    .field('password_confirmation', user.password)
    .end();

  response.assertStatus(201);
});

test('create already registered user: position 02 Array users', async ({
  client,
}) => {
  const user = users[1];

  const response = await client
    .post('/api/v1/auth/register')
    .field('username', user.username)
    .field('email', user.email)
    .field('password', user.password)
    .field('password_confirmation', user.password)
    .end();

  response.assertStatus(401);
});

test('confirm user: position 2 array', async ({ client }) => {
  const dataUser = users[1];

  const user = await User.findBy('email', dataUser.email);

  const response = await client
    .post('/api/v1/auth/register-confirm')
    .field('hash', user.token)
    .end();

  response.assertStatus(200);
});

test('create user: position 03 Array users', async ({ client }) => {
  const user = users[2];

  const response = await client
    .post('/api/v1/auth/register')
    .field('username', user.username)
    .field('email', user.email)
    .field('password', user.password)
    .field('password_confirmation', user.password)
    .end();

  response.assertStatus(201);
});

test('create already registered user: position 01 users', async ({
  client,
}) => {
  const user = users[0];

  const response = await client
    .post('/api/v1/auth/register')
    .field('username', user.username)
    .field('email', user.email)
    .field('password', user.password)
    .field('password_confirmation', user.password)
    .end();

  response.assertStatus(406);
});
