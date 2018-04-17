import {WithLocalization} from '../../../shared/models/with-localization';


export class County extends WithLocalization {
    id: string;
    idRegion: string;
    idState: string;
    isActive: boolean;

    static fromJSON(data: object): County {
        const county = new County();

        return Object.assign(county, data);
    }
}
