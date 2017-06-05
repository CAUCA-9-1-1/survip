import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'igo2';

import {EditDatagrid} from '../../core/devextreme.editdatagrid';
import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';

@Component({
  selector: 'app-management-address-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.styl'],
  providers: [CountryService]
})
export class CountryComponent extends EditDatagrid implements OnInit {
  countries: Country[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private countryService: CountryService, translate: LanguageService) {
    super();

    this.editing = {
      mode: 'form',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      form: {
        colCount: 1,
        items: [{
          dataField: 'name',
          isRequired: true
        }, {
          dataField: 'codeAlpha2',
          editorOptions: {
            maxLength: 2
          }
        }, {
          dataField: 'codeAlpha3',
          editorOptions: {
            maxLength: 3
          }
        }, {
          dataField: 'isActive',
          editorType: 'dxCheckBox'
        }]
      }
    };
    this.filter = {
      visible: true
    };
  }

  public ngOnInit() {
    this.loadAll();
  }

  /* ngOnChanges() {
    console.log('change');
  }*/

  public onRowUpdated(e) {
    for (const i in e.data) {
      if (e.data[i]) {
        e.key[i] = e.data[i];
      }
    }

    this.countryService.update(e.key).subscribe(info => {
      if (!info.success) {
        console.error(info.error);
      }
    });
  }

  private loadAll() {
    this.countryService.getAll().subscribe(infoCountry => {
      if (!infoCountry.success) {
        console.error(infoCountry.error);
      }

      this.countries = infoCountry.data;
    });
  }
}
