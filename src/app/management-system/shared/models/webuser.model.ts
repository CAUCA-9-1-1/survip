import { BaseModel } from '../../../shared/models/base.model';
import {Permission} from '../../../user-access/shared/models/permission.model';
import {UserGroupModel} from './user-group-model';


export class Webuser extends BaseModel {
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    fireSafetyDepartments: any[];
    phoneNumber: string;
    permissions: Permission[];
    groups: UserGroupModel[];
}
