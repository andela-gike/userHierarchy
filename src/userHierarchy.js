class Hierarchy {
  constructor() {
    this.users = [];
    this.roles = [];
    this.idMapping = {};
  }

  setUsers(users) {
    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('Users is expected as a non-empty array of users object');
    }
    this.users = users;
  }

  setRoles(roles) {
    if (!Array.isArray(roles) || roles.length === 0) {
      throw new Error('Roles is expected as a non-empty array of roles object');
    }
    this.roles = roles;
    this.setRoleIdMapping();
  }

  setRoleIdMapping() {
    const indexed = {};
    const root = this.roles.find((r) => r.Parent === 0);
    indexed[root.Id] = [];

    this.roles.forEach((role) => {
      if (indexed[role.Parent] instanceof Array) {
        indexed[role.Parent].push(role.Id);
      } else {
        indexed[role.Parent] = [role.Id];
      }
      if (!indexed[root.Id].includes(role.Id)) {
        indexed[root.Id].push(role.Id);
      }
    });
    // console.log(indexed);
    this.idMapping = indexed;
  }

  getSubOrdinates(id) {
    const { Role, Id } = this.users.find((user) => user.Id === id) || {};
    if (!Role) {
      throw new Error(`User with Role '${id}' not found.`);
    }

    return this.users
      .filter((user) => this.idMapping[Role] && this.idMapping[Role].includes(user.Role)
        && user.Id !== Id)
      .sort((first, second) => first.Id - second.Id);
  }
}

export default Hierarchy;
