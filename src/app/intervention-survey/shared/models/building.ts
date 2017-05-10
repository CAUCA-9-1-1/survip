import {BuildingContact} from './building-contact';
import {BuildingPersonRequiringAssistance} from './building-person-requiring-assistance';
import {BuildingHazardousMaterial} from './building-hazardous-material';

export class Building {
  id: string;
  isActive: boolean;
  idLane: string;
  alias: string;
  createdOn: Date;
  isParent: boolean;
  matricule: string;
  idRiskLevel: string;
  idUtilisationCode: string;
  coordinates: string;
  numberOfFloors: number;
  civicNumber: string;
  civicLetter: string;
  civicSupp: string;
  civicLetterSupp: string;

  contacts: BuildingContact[];
  personsRequiringAssistance: BuildingPersonRequiringAssistance[];
  hazardousMaterials: BuildingHazardousMaterial[];
}
