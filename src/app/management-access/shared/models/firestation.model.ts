import { BaseModel } from '../../../shared/models/base.model';


export class Firestation extends BaseModel {
    name: string;
    email: string;
    phoneNumber: string;
    faxNumber: string;
    idBuilding: string;
    idFireSafetyDepartment: string;

    static fromJSON(data: object): Firestation {
        const station = new Firestation();

        return Object.assign(station, data);
    }
}
