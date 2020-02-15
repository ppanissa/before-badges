'use strict';

const Model = use('Model');
const Env = use('Env');

class File extends Model {
  static get table() {
    return 'files';
  }

  static get computed() {
    return ['url'];
  }

  getUrl({ id, name }) {
    const url = Env.get('APP_URL');

    return `${url}/api/v1/file/${id}/${name}`;
  }
}

module.exports = File;
