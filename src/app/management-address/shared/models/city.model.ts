import {WithLocalization} from '../../../shared/models/with-localization';


export class City extends WithLocalization {
    id: string;
    code: string;
    code3Letters: string;
    emailAddress: string;
    idCounty: string;
    idCityType: string;
    isActive: boolean;
    createdOn: Date;

    static fromJSON(data: object): City {
        const city = new City();

        return Object.assign(city, data);
    }
}
