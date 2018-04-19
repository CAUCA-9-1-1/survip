import { WithLocalization } from '../../../shared/models/with-localization';


export class Country extends WithLocalization {
    codeAlpha2: string;
    codeAlpha3: string;
    states: any[];

    static fromJSON(data: object): Country {
        const country = new Country();

        return Object.assign(country, data);
    }
}
