import { BaseModel } from './base.model';


export class ConfigurationTemplate extends BaseModel {
  data: string;
  name: string;
  idFireSafetyDepartment: string;
  isDefault: boolean;

  static fromJSON(data: object): ConfigurationTemplate {
    const template = new ConfigurationTemplate();

    return Object.assign(template, data);
  }
}
