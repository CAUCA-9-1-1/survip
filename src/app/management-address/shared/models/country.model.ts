import { WithLocalization } from '../../../shared/models/with-localization';


export class Country extends WithLocalization {
    id: string;
    isActive: boolean;
    codeAlpha2: string;
    codeAlpha3: string;
    createdOn: Date;
    states: any[];

    static fromJSON(data: object): Country {
        const country = new Country();

        return Object.assign(country, data);
    }
}
