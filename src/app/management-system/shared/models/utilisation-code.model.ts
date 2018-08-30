import {WithLocalization} from '../../../shared/models/with-localization';


export class UtilisationCode extends WithLocalization {
    cubf: string;
    scian: string;

    static fromJSON(data: object): UtilisationCode {
        const code = new UtilisationCode();

        return Object.assign(code, data);
    }
}
