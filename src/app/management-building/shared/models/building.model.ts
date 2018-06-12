import {WithLocalization} from '../../../shared/models/with-localization';


export class Building extends WithLocalization {
    appartmentNumber = '';
    buildingValue = 0;
    childType: number;
    civicLetter = '';
    civicLetterSupp = '';
    civicNumber = '';
    civicSupp = '';
    coordinates = '';
    coordinatesSource = '';
    details = '';
    floor = '';
    idLane: string;
    idLaneTransversal: string;
    idParentBuilding: string;
    idPicture: string;
    idRiskLevel: string;
    idUtilisationCode: string;
    isParent: boolean;
    matricule = '';
    numberOfAppartment = 0;
    numberOfBuilding = 0;
    numberOfFloor = 0;
    postalCode = '';
    showInResources = false;
    source = '';
    suite = '';
    utilisationDescription = '';
    vacantLand = false;
    yearOfConstruction = 2000;

    static fromJSON(data: object): Building {
        const building = new Building();

        return Object.assign(building, data);
    }
}
