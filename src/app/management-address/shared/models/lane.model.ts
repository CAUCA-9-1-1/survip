import {WithLocalization} from '../../../shared/models/with-localization';


export class Lane extends WithLocalization {
    id: string;
    idCity: string;
    genericCode: string;
    publicLaneCode: string;
    isActive: boolean;
    createdOn: Date;

    static fromJSON(data: object): Lane {
        const lane = new Lane();

        return Object.assign(lane, data);
    }
}
