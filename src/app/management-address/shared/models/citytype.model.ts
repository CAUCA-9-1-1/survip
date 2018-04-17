import {WithLocalization} from '../../../shared/models/with-localization';


export class CityType extends WithLocalization {
    id: string;
    isActive: boolean;
    createdOn: Date;

    static fromJSON(data: object): CityType {
        const cityType = new CityType();

        return Object.assign(cityType, data);
    }
}
