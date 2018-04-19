import { WithLocalization } from '../../../shared/models/with-localization';


export class State extends WithLocalization {
    ansiCode: string;
    idCountry: string;
    country: any[];
    counties: any[];
    regions: any[];

    static fromJSON(data: object): State {
        const state = new State();

        return Object.assign(state, data);
    }
}
