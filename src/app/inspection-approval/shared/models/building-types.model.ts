import {WithLocalization} from '../../../shared/models/with-localization';


export class BuildingTypes extends WithLocalization {

    static fromJSON(data: object): BuildingTypes {
        const info = new BuildingTypes();

        return Object.assign(info, data);
    }
}
