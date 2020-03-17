import UserHierarchy from '../src/userHierarchy';
import mockData from './__mocks__/dummyUser.json';

describe('Hierarchy test suite', () => {
  let Hierarchy;
  beforeEach(() => {
    Hierarchy = new UserHierarchy();
  });

  test('checks the application structure to be a class', () => {
    expect(Hierarchy).toBeInstanceOf(UserHierarchy);
    expect(Hierarchy.getSubOrdinates).toBeInstanceOf(Function);
    expect(Hierarchy.setRoleIdMapping).toBeInstanceOf(Function);
    expect(Hierarchy.setRoles).toBeInstanceOf(Function);
    expect(Hierarchy.setUsers).toBeInstanceOf(Function);
  });

  test('checks if setUsers receives a non empty array of users', () => {
    expect(() => Hierarchy.setUsers()).toThrowError(/Users is expected as a/);
    expect(() => Hierarchy.setUsers([]))
      .toThrowError('Users is expected as a non-empty array of users object');
  });

  test('set the users array', () => {
    Hierarchy.setUsers(mockData.users);
    expect(Hierarchy.users).toHaveLength(5);
    expect(Hierarchy.users).toContainEqual(
      {
        Id: 1,
        Name: 'Adam Admin',
        Role: 1,
      },
    );
  });

  test('checks if setRoles receives a non empty array of roles', () => {
    expect(() => Hierarchy.setRoles()).toThrowError(/Roles is expected as a/);
    expect(() => Hierarchy.setRoles([]))
      .toThrowError('Roles is expected as a non-empty array of roles object');
  });

  test('set the roles array', () => {
    Hierarchy.setRoles(mockData.roles);
    expect(Hierarchy.roles).toHaveLength(5);
    expect(Hierarchy.roles).toContainEqual(
      {
        Id: 1,
        Name: 'System Administrator',
        Parent: 0,
      },
    );
  });

  test('checks if getSubOrdinates receives an id', () => {
    expect(() => Hierarchy.getSubOrdinates()).toThrowError(/A user with role/);
  });

  test('checks if getSubOrdinates receives an id of an existing user', () => {
    Hierarchy.setRoles(mockData.roles);
    Hierarchy.setUsers(mockData.users);
    expect(() => Hierarchy.getSubOrdinates(90)).toThrowError(/A user with role/);
  });

  test('should return all the subordinates of a user if user exist', () => {
    Hierarchy.setRoles(mockData.roles);
    Hierarchy.setUsers(mockData.users);
    const treeHierarchy = Hierarchy.getSubOrdinates(1);
    expect(treeHierarchy).toHaveLength(4);
    expect(treeHierarchy).toContainEqual(
      {
        Id: 2,
        Name: 'Emily Employee',
        Role: 4,
      },
      {
        Id: 3,
        Name: 'Sam Supervisor',
        Role: 3,
      },
      {
        Id: 4,
        Name: 'Mary Manager',
        Role: 2,
      },
      {
        Id: 5,
        Name: 'Steve Trainer',
        Role: 5,
      },
    );
  });
});
