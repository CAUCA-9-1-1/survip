import { WithLocalization } from '../../../shared/models/with-localization';


export class State extends WithLocalization {
    id: string;
    ansiCode: string;
    idCountry: string;
    isActive: boolean;
    createdOn: Date;
    country: any[];
    counties: any[];
    regions: any[];

    static fromJSON(data: object): State {
        const state = new State();

        return Object.assign(state, data);
    }
}
