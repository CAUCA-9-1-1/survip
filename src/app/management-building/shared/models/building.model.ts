import {WithLocalization} from '../../../shared/models/with-localization';


export class Building extends WithLocalization {
    appartmentNumber: string;
    buildingValue: number;
    childType: number;
    civicLetter: string;
    civicLetterSupp: string;
    civicNumber: string;
    civicSupp: string;
    coordinates: string;
    coordinatesSource: string;
    details: string;
    floor: string;
    idLane: string;
    idLaneTransversal: string;
    idParentBuilding: string;
    idPicture: string;
    idRiskLevel: string;
    idUtilisationCode: string;
    isParent: boolean;
    matricule: string;
    numberOfAppartment: number;
    numberOfBuilding: number;
    numberOfFloor: number;
    postalCode: string;
    showInResources: string;
    source: string;
    suite: string;
    utilisationDescription: string;
    vacantLand: boolean;
    yearOfConstruction: number;

    static fromJSON(data: object): Building {
        const building = new Building();

        return Object.assign(building, data);
    }
}
