import {UserFireSafetyDepartmentModel} from './user-fire-safety-department-model';
import {UserModel as BaseUserModel} from '@cause-911/management';
export class UserModel extends BaseUserModel {
  userFireSafetyDepartments: UserFireSafetyDepartmentModel[] = [];
}
