import {WithLocalization} from '../../../shared/models/with-localization';


export class CityType extends WithLocalization {

    static fromJSON(data: object): CityType {
        const cityType = new CityType();

        return Object.assign(cityType, data);
    }
}
