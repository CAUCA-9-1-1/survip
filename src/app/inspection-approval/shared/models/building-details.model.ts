import {BaseModel} from '../../../shared/models/base.model';


export class BuildingDetails extends BaseModel {
    garageType: string;
    idBuildingType: string;
    idBuildingSidingType: string;
    idUnitOfMeasureHeight: string;
    idUnitOfMeasureEstimatedWaterFlow: string;
    idConstructionType: string;
    idConstructionFireResistanceType: string;
    idRoofType: string;
    idRoofMaterialType: string;

    static fromJSON(data: object): BuildingDetails {
        const info = new BuildingDetails();

        return Object.assign(info, data);
    }
}
