
/**
 * The Hierarchy class has a collection of methods to set users and roles
 * to get a list of subordinates
 */
class Hierarchy {
  constructor() {
    this.users = [];
    this.roles = [];
    this.idMapping = {};
  }

  /**
   * This method takes an array of usersArr and checks if the array is empty
   * then assigns the value to the users array
   * @param {Array} usersArr
   */
  setUsers(usersArr) {
    if (!Array.isArray(usersArr) || usersArr.length === 0) {
      throw new Error('Users is expected as a non-empty array of users object');
    }
    this.users = usersArr;
  }


  /**
   * This method takes an array of rolesArr and checks if the array is empty
   * then assigns the value to the roles array
   * Then call the setRoleIdMapping to mapp each role to their parent
   * @param {Array} rolesArr
   */
  setRoles(rolesArr) {
    if (!Array.isArray(rolesArr) || rolesArr.length === 0) {
      throw new Error('Roles is expected as a non-empty array of roles object');
    }
    this.roles = rolesArr;
    this.setRoleIdMapping();
  }

  /**
   *  This method finds the parent role and map each child into the parent
   */

  setRoleIdMapping() {
    const mappedRoles = {};
    const root = this.roles.find((role) => role.Parent === 0);
    mappedRoles[root.Id] = [];

    this.roles.forEach((role) => {
      if (mappedRoles[role.Parent] instanceof Array) {
        mappedRoles[role.Parent].push(role.Id);
      } else {
        mappedRoles[role.Parent] = [role.Id];
      }
      if (!mappedRoles[root.Id].includes(role.Id)) {
        mappedRoles[root.Id].push(role.Id);
      }
    });
    this.idMapping = mappedRoles;
  }

  /**
   *
   * This method takes the user id , checks if the user exists in the user arr
   * and then return the subordinate for the user
   * @param {Number} id
   * @returns {Array} of user's subordinate
   */
  getSubOrdinates(id) {
    const { Role, Id } = this.users.find((user) => user.Id === id) || {};
    if (!Role) {
      throw new Error(`A user with role'${id}' is not found.`);
    }

    return this.users
      .filter((user) => this.idMapping[Role] && this.idMapping[Role].includes(user.Role)
        && user.Id !== Id);
  }
}

export default Hierarchy;
