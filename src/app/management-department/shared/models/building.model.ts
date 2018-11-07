import {WithLocalization} from '../../../shared/models/with-localization';
import {Picture} from '../../../shared/models/picture.model';


export class Building extends WithLocalization {
    appartmentNumber = '';
    buildingValue = 0.0;
    childType = 0;
    civicLetter = '';
    civicLetterSupp = '';
    civicNumber = '';
    civicSupp = '';
    coordinates = null;
    coordinatesSource = '';
    details = '';
    floor = '';
    idLane: string;
    idLaneTransversal: string = null;
    idParentBuilding: string = null;
    idPicture: string = null;
    idRiskLevel: string;
    idUtilisationCode: string = null;
    matricule = '';
    numberOfAppartment = 0;
    numberOfBuilding = 0;
    numberOfFloor = 0;
    picture: Picture;
    postalCode = '';
    showInResources = false;
    source = '';
    suite = 0;
    utilisationDescription = '';
    vacantLand = false;
    yearOfConstruction = 2000;

    static fromJSON(data: object): Building {
        const building = new Building();

        return Object.assign(building, data);
    }
}

