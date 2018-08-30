import { BaseModel } from '../../../shared/models/base.model';


export class Webuser extends BaseModel {
    username: string;
    password: string;
    attributes: any[];
    fireSafetyDepartments: any[];

    static fromJSON(data: object): Webuser {
        const webuser = new Webuser();

        return Object.assign(webuser, data);
    }
}
