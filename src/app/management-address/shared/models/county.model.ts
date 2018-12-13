import {WithLocalization} from '../../../shared/models/with-localization';


export class County extends WithLocalization {
    idRegion: string;

    static fromJSON(data: object): County {
        const county = new County();

        return Object.assign(county, data);
    }
}
