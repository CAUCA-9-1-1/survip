import {BaseModel} from '../../../shared/models/base.model';


export class BuildingHazardousMaterial extends BaseModel {
    idBuilding: string;
    idHazardousMaterial: string;
    idUnitOfMeasure: string;
    capacityContainer = 0;
    container = '';
    floor = '';
    gasInlet = '';
    otherInformation = '';
    place = '';
    quantity = 0;
    securityPerimeter = '';
    sector = '';
    wall = '';
    tankType = 0;
    supplyLine = '';

    static fromJSON(data: object): BuildingHazardousMaterial {
        const material = new BuildingHazardousMaterial();

        return Object.assign(material, data);
    }
}
