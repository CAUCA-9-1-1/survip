import { BaseModel } from '../../../shared/models/base.model';


export class ConfigurationTemplate extends BaseModel {
  data: string;
  name: string;

  static fromJSON(data: object): ConfigurationTemplate {
    const template = new ConfigurationTemplate();

    return Object.assign(template, data);
  }
}
