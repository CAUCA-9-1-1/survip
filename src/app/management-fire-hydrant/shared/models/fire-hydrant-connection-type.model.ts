import {WithLocalization} from '../../../shared/models/with-localization';


export class FireHydrantConnectionType extends WithLocalization {

    static fromJSON(data: object): FireHydrantConnectionType {
        const type = new FireHydrantConnectionType();

        return Object.assign(type, data);
    }
}
