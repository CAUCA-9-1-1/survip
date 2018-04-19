import {WithLocalization} from '../../../shared/models/with-localization';


export class Region extends WithLocalization {
    code: string;
    idState: string;

    static fromJSON(data: object): Region {
        const region = new Region();

        return Object.assign(region, data);
    }
}
