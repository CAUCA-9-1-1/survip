import { Injectable } from '@angular/core';
import {Address} from './address.interface';

@Injectable()
export class AddressService {
  ADDRESS: Address = {
      'id_address': '1',
      'address': '2030, 127E RUE',
      'assignment': 'Immeuble à bureaux',
      'number_of_address': 1,
      'number_of_building': 1,
      'plan_course': ['BOUL. LACROIX, GAUCHE SUR 127E RUE - COIN 22E AVENUE', 'Parcours #2']
    };

  constructor() { }

  getAddress(): Promise<Address> {
    return Promise.resolve(this.ADDRESS);
  }
}
