import { Component, OnInit } from '@angular/core';
import {Address} from '../shared/address.interface';
import {AddressService} from '../shared/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.styl']
})
export class AddressComponent implements OnInit {
  address: Address;

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.addressService.getAddress().then(result => this.address = result);
  }

}
