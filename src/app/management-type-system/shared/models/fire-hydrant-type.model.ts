import {WithLocalization} from '../../../shared/models/with-localization';


export class FireHydrantType extends WithLocalization {

    static fromJSON(data: object): FireHydrantType {
        const type = new FireHydrantType();

        return Object.assign(type, data);
    }
}
