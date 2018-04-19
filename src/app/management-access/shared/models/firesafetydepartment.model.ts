import { WithLocalization } from '../../../shared/models/with-localization';


export class FireSafetyDepartment extends WithLocalization {
    idCounty: string;
    language: string;

    static fromJSON(data: object): FireSafetyDepartment {
        const department = new FireSafetyDepartment();

        return Object.assign(department, data);
    }
}
