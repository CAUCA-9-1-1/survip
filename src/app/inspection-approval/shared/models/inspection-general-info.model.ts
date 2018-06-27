import {BaseModel} from '../../../shared/models/base.model';


export class InspectionGeneralInfo extends BaseModel {
    idCity: string;
    mainBuildingIdLane: string;
    mainBuildingAddress: string;
    mainBuildingIdRiskLevel: string;
    mainBuildingIdUtilisationCode: string;
    idLaneTransversal: string;
    idPictureSitePlan: string;

    static fromJSON(data: object): InspectionGeneralInfo {
        const info = new InspectionGeneralInfo();

        return Object.assign(info, data);
    }
}
