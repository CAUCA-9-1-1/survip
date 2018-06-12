import {WithLocalization} from '../../../shared/models/with-localization';

export class HazardousMaterial extends WithLocalization {
    number = '';
    guideNumber = '';
    reactToWater = false;
    toxicInhalationHazard = false;

    static fromJSON(data: object): HazardousMaterial {
        const material = new HazardousMaterial();

        return Object.assign(material, data);
    }
}
