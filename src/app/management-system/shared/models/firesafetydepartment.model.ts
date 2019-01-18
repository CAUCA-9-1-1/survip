import { WithLocalization } from '../../../shared/models/with-localization';
import {Picture} from '../../../shared/models/picture.model';


export class FireSafetyDepartment extends WithLocalization {
    idCounty: string;
    language: string;
    idPicture: string = null;
    picture: Picture;

    static fromJSON(data: object): FireSafetyDepartment {
        const department = new FireSafetyDepartment();

        return Object.assign(department, data);
    }
}
