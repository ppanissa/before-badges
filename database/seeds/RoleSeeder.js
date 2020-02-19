'use strict';

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Config = use('Config');
const Role = use('Role');
const Database = use('Database');

class RoleSeeder {
  async run() {
    const trx = await Database.beginTransaction();

    const roles = Config.get('acl.roles');

    if (!roles) return false;

    for (const i in roles) {
      const role = await Role.query()
        .where('slug', roles[i].slug)
        .first();
      if (!role) {
        await Role.create(roles[i]);
      }
    }
    trx.commit();
  }
}

module.exports = RoleSeeder;
