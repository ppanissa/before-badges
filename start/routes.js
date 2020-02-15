'use strict';

const Route = use('Route');
const Helpers = use('Helpers');

const routeApi = 'api/v1';

/**
 * File Service
 */
Route.group(() => {
  Route.resource('files', 'FileController')
    .except(['index', 'create', 'edit', 'update'])
    .apiOnly();
})
  .prefix(`${routeApi}/`)
  .namespace('File');
// .middleware(['auth:jwt']);

/**
 * return user files
 * @param {email,file}
 * @returs {file}
 */
Route.get('file/:id/:file', async ({ response, params }) => {
  // where :file is file name
  return response.download(
    Helpers.tmpPath(`uploads/${params.id}/${params.file}`),
  );
})
  .as('file.index')
  .prefix(routeApi);
