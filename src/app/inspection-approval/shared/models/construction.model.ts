import {WithLocalization} from '../../../shared/models/with-localization';


export class Construction extends WithLocalization {

    static fromJSON(data: object): Construction {
        const info = new Construction();

        return Object.assign(info, data);
    }
}
