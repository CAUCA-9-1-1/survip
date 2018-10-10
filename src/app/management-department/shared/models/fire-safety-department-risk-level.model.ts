import {BaseModel} from '../../../shared/models/base.model';


export class FireSafetyDepartmentRiskLevel extends BaseModel {
    idFireSafetyDepartment: string;
    riskLevelIds: string;
    idSurvey: string;
    hasGeneralInformation: string;
    hasCourse: string;

    static fromJSON(data: object): FireSafetyDepartmentRiskLevel {
        const ssi = new FireSafetyDepartmentRiskLevel();

        return Object.assign(ssi, data);
    }
}
