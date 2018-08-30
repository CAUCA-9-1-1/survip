import {BaseModel} from '../../../shared/models/base.model';


export class BuildingPnaps extends BaseModel {
    idBuilding = '';
    idPersonRequiringAssistanceType = '';
    personName = '';
    contactName = '';
    contactPhoneNumber = '';
    floor = '';
    local = '';
    description = '';
    dayIsApproximate = false;
    dayResidentCount = 0;
    eveningIsApproximate = false;
    eveningResidentCount = 0;
    nightIsApproximate = false;
    nightResidentCount = 0;

    static fromJSON(data: object): BuildingPnaps {
        const pnaps = new BuildingPnaps();

        return Object.assign(pnaps, data);
    }
}
