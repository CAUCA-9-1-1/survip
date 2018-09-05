import {WithLocalization} from '../../../shared/models/with-localization';


export class RiskLevel extends WithLocalization {
    code: number;
    color: string;
    sequence: number;

    static fromJSON(data: object): RiskLevel {
        const risk = new RiskLevel();

        return Object.assign(risk, data);
    }
}
