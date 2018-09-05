import {PermissionSystemFeature} from '../../../management-system/shared/models/permissionsystemfeature.model';


export class Permission {
    id: string;
    idPermissionObject: string;
    idPermissionSystem: string;
    idPermissionSystemFeature: string;
    comments: string;
    access: boolean;
    feature: PermissionSystemFeature;
}
