import {WithLocalization} from '../../../shared/models/with-localization';


export class Lane extends WithLocalization {
    idCity: string;
    idLaneGenericCode: string;
    idPublicCode: string;

    static fromJSON(data: object): Lane {
        const lane = new Lane();

        return Object.assign(lane, data);
    }
}
