'use strict';

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

// const Factory = use('Factory');
const Config = use('Config');
const Role = use('Role');
const Permission = use('Permission');
const Database = use('Database');

class PermissionSeeder {
  async run() {
    const trx = await Database.beginTransaction();

    const cfgpermission = Config.get('acl.permissions');

    const keys = Object.keys(cfgpermission);

    const getRolesInDb = async role => {
      const data = await Role.query()
        .select('id', 'name', 'slug')
        .where('slug', role)
        .first();
      if (data) {
        return data;
      }
    };

    for (const item in keys) {
      const { allAttach, permissions } = cfgpermission[keys[item]];
      const getRoles = [];
      if (allAttach && allAttach.length > 0) {
        for (const roleI in allAttach) {
          getRoles.push(await getRolesInDb(allAttach[roleI]));
        }
      }

      // Check Permission Object Exists
      if (permissions && permissions.length > 0) {
        for (const i in permissions) {
          let permission = null;
          const { attach, ...data } = permissions[i];

          const fetchPermission = await Permission.query()
            .where('slug', data.slug)
            .first();

          if (!fetchPermission) {
            // Create Permission Here
            permission = await Permission.create(data);
            if (permission && attach && attach.length > 0) {
              for (const i in attach) {
                const role = await getRolesInDb(attach[i]);
                if (role) role.permissions().attach([permission.id]);
              }
            }
          }

          if (permission) {
            if (getRoles && getRoles.length > 0) {
              for (const igr in getRoles) {
                await getRoles[igr].permissions().attach([permission.id]);
              }
            }
          }
        }
      }
    }
    trx.commit();
  }
}

module.exports = PermissionSeeder;
