import {WithLocalization} from '../../../shared/models/with-localization';


export class PersonRequiringAssistanceType extends WithLocalization {

    static fromJSON(data: object): PersonRequiringAssistanceType {
        const type = new PersonRequiringAssistanceType();

        return Object.assign(type, data);
    }
}
