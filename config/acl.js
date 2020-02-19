/*
  |--------------------------------------------------------------------------
  | Define Roles
  |--------------------------------------------------------------------------
  |
  | Defina as roles de sua aplicação
  | Caso queira criar uma nova role pasta adicionar novo object ao array
  |
  */
const roles = [
  {
    name: 'Proprietário',
    slug: 'owner',
    description: 'Privilégios de proprietário',
  },
  {
    name: 'Administrador',
    slug: 'admin',
    description: 'Privilégios de Administradores',
  },
  {
    name: 'Moderador',
    slug: 'mod',
    description: 'Privilégios de Moderador',
  },
  {
    name: 'Recursos Humanos',
    slug: 'rh',
    description: 'Privilégios do RH',
  },
  {
    name: 'Pessoa Jurídica',
    slug: 'pj',
    description: 'Privilégios do PJ',
  },
  {
    name: 'Colaborador',
    slug: 'employer',
    description: 'Privilégios do Colaborador',
  },
];

/*
  |--------------------------------------------------------------------------
  | Define Permissions
  |--------------------------------------------------------------------------
  |
  | Defina as permissões da sua aplicação
  | Caso queira criar uma nova permissão pasta adicionar novo object ao array
  |
  */
const permissions = {
  users: {
    /*
     * Vincula todas as permissões a Role
     * Exemplo: allAttach: ['slug', 'slug', 'slug']
     */
    allAttach: ['owner', 'admin', 'mod', 'rh'],
    permissions: [
      {
        name: 'Criar usuários',
        slug: 'create_users',
        description: 'Permissão para criar usuários',
        attach: [],
      },
      {
        name: 'Editar usuários',
        slug: 'update_users',
        description: 'Permissão para editar usuários',
        attach: [],
      },
      {
        name: 'Visualizar usuários',
        slug: 'read_users',
        description: 'Permissão para visualizar usuários',
        attach: ['pj', 'employer'],
      },
      {
        name: 'Deletar usuários',
        slug: 'delete_users',
        description: 'Permissão para deletar usuários',
        attach: [],
      },
    ],
  },
  roles: {
    /*
     * Vincula todas as permissões a Role
     * Exemplo: allAttach: ['slug', 'slug', 'slug']
     */
    allAttach: ['owner', 'admin', 'mod'],
    permissions: [
      {
        name: 'Criar roles',
        slug: 'create_roles',
        description: 'Permissão para criar roles',
        attach: [],
      },
      {
        name: 'Editar roles',
        slug: 'update_roles',
        description: 'Permissão para editar roles',
        attach: [],
      },
      {
        name: 'Visualizar roles',
        slug: 'read_roles',
        description: 'Permissão para visualizar roles',
        attach: ['rh'],
      },
      {
        name: 'Deletar roles',
        slug: 'delete_roles',
        description: 'Permissão para deletar roles',
        attach: [],
      },
    ],
  },
  permissions: {
    /*
     * Vincula todas as permissões a Role
     * Exemplo: allAttach: ['slug', 'slug', 'slug']
     */
    allAttach: ['owner', 'admin', 'mod'],
    permissions: [
      {
        name: 'Criar permissions',
        slug: 'create_permissions',
        description: 'Permissão para criar permissions',
        attach: [],
      },
      {
        name: 'Editar permissions',
        slug: 'update_permissions',
        description: 'Permissão para editar permissions',
        attach: [],
      },
      {
        name: 'Visualizar permissions',
        slug: 'read_permissions',
        description: 'Permissão para visualizar permissions',
        attach: ['rh'],
      },
      {
        name: 'Deletar permissions',
        slug: 'delete_permissions',
        description: 'Permissão para deletar permissions',
        attach: [],
      },
    ],
  },
};

module.exports = { roles, permissions };
