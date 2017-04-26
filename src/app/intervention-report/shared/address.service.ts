import { Injectable } from '@angular/core';
import {Address} from './address.model';

@Injectable()
export class AddressService {
  ADDRESS: Address = {
      'idAddress': '1',
      'address': '2030, 127E RUE',
      'assignment': 'Immeuble à bureaux',
      'numberOfAddress': 1,
      'numberOfBuilding': 1,
      'planCourse': ['BOUL. LACROIX, GAUCHE SUR 127E RUE - COIN 22E AVENUE', 'Parcours #2']
    };

  constructor() { }

  getAddress(): Promise<Address> {
    return Promise.resolve(this.ADDRESS);
  }
}
