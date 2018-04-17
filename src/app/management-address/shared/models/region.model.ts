import {WithLocalization} from '../../../shared/models/with-localization';


export class Region extends WithLocalization {
    id: string;
    code: string;
    idState: string;
    isActive: boolean;
    createdOn: Date;

    static fromJSON(data: object): Region {
        const region = new Region();

        return Object.assign(region, data);
    }
}
