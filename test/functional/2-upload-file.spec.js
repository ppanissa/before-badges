'use strict';

const Helpers = use('Helpers');
const Env = use('Env');
const users = require('../userFake');
const { test, trait } = use('Test/Suite')('File: Upload');
trait('Test/ApiClient');
trait('Auth/Client');

let getFile = null;

test('FileController: Upload File', async ({ client }) => {
  const user = users[0];

  const {
    body: { data: dataToken },
  } = await client
    .post('/api/v1/auth/login')
    .field('login', user.username)
    .field('password', user.password)
    .end();

  const {
    body: { data },
  } = await client
    .post('/api/v1/files')
    .header('Authorization', `${dataToken.type} ${dataToken.token}`)
    .attach('file', Helpers.tmpPath('test/upload-file-test.jpg'))
    .end();

  getFile = data;
});

test(`FileController: Show File With Id`, async ({ client }) => {
  const user = users[0];

  const {
    body: { data: dataToken },
  } = await client
    .post('/api/v1/auth/login')
    .field('login', user.username)
    .field('password', user.password)
    .end();

  const response = await client
    .get(`/api/v1/files/${getFile.id}`)
    .header('Authorization', `${dataToken.type} ${dataToken.token}`)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset({
    id: getFile.id,
    name: 'upload-file-test.jpg',
    real_name: 'upload-file-test',
    extname: 'jpg',
    type: 'image',
    subtype: 'jpeg',
    url: `${Env.get('APP_URL')}/api/v1/file/${getFile.id}/upload-file-test.jpg`,
  });
});

test(`FileController: Get Error: 400`, async ({ client }) => {
  const user = users[0];

  const {
    body: { data: dataToken },
  } = await client
    .post('/api/v1/auth/login')
    .field('login', user.username)
    .field('password', user.password)
    .end();

  const response = await client
    .get(`/api/v1/files/1`)
    .header('Authorization', `${dataToken.type} ${dataToken.token}`)
    .end();
  response.assertStatus(400);
  response.assertJSONSubset({
    message:
      'Não localizei o que procura, faz seguinte, tente novamente. hahaha',
  });
});

test(`FileController: Delete File`, async ({ client }) => {
  const user = users[0];

  const {
    body: { data: dataToken },
  } = await client
    .post('/api/v1/auth/login')
    .field('login', user.username)
    .field('password', user.password)
    .end();
  const response = await client
    .delete(`/api/v1/files/${getFile.id}`)
    .header('Authorization', `${dataToken.type} ${dataToken.token}`)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset({
    message: 'Arquivo removido com sucesso.',
  });
});

test(`FileController: 401 Delete File`, async ({ client }) => {
  const response = await client.delete(`/api/v1/files/${getFile.id}`).end();
  response.assertStatus(401);
});
