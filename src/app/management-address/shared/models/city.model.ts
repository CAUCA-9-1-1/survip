import {WithLocalization} from '../../../shared/models/with-localization';


export class City extends WithLocalization {
    code: string;
    code3Letters: string;
    emailAddress: string;
    idCounty: string;
    idCityType: string;

    static fromJSON(data: object): City {
        const city = new City();

        return Object.assign(city, data);
    }
}
