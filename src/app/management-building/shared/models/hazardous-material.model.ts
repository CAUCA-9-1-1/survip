import {WithLocalization} from '../../../shared/models/with-localization';

export class HazardousMaterial extends WithLocalization {
    number: string;
    guideNumber: string;
    reactToWater: boolean;
    toxicInhalationHazard: boolean;

    static fromJSON(data: object): HazardousMaterial {
        const material = new HazardousMaterial();

        return Object.assign(material, data);
    }
}
