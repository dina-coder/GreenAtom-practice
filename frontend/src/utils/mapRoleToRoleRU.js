import { Roles } from '../constants/roles';

export const mapRoleToRoleRU = (role) => {
  switch (role) {
    case Roles.HR: return 'Сотрудник кадровой службы';
    case Roles.Director: return 'Руководитель';
    case Roles.Employee: return 'Сотрудник';
    default: return undefined;
  }
};