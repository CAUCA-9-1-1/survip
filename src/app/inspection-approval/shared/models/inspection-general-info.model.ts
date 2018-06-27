import {BaseModel} from '../../../shared/models/base.model';


export class InspectionGeneralInfo extends BaseModel {
    idCity: string;
    mainBuildingIdLane: string;
    mainBuildingIdRiskLevel: string;
    mainBuildingIdUtilisationCode: string;
    idLaneTransversal: string;

    static fromJSON(data: object): InspectionGeneralInfo {
        const inspection = new InspectionGeneralInfo();

        return Object.assign(inspection, data);
    }
}
