import { Roles } from '../constants/roles';

export const mapRoleIdToRole = (roleId) => {
  switch (roleId) {
    case 1: return Roles.HR;
    case 2: return Roles.Director;
    case 3: return Roles.Employee;
    default: return undefined;
  }
};