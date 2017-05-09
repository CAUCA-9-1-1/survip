export class BuildingPersonRequiringAssistance {
  id: string;
  idBuilding: string;
  idBuildingInformation: string;
  idPersonRequiringAssistanceType: string;
  dayResidentCount: number;
  eveningResidentCount: number;
  nightResidentCount: number;
  dayIsApproximate: boolean;
  eveningIsApproximate: boolean;
  nightIsApproximate: boolean;
  description: string;
  praName: string;
  floor: string;
  local: string;
  contactName: string;
  contactPhoneNumber: string;
  createdOn: Date;
  isActive: boolean;
}
