import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {Country} from '../../core/models/country';
import {CountryService} from '../../core/services/country.service';

@Component({
  selector: 'app-management-address-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.styl']
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  columns: Object[] = [];
  editing: Object = {};
  filter: Object = {};

  constructor(private countryService: CountryService, translate: TranslateService) {
    this.columns = [{
      dataField: 'id_country',
      visible: false
    }, {
      dataField: 'name',
      sortOrder: 'asc',
      calculateCellValue: function (data) {
        return (data.name ? data.name['fr'] : '');
      },
      editCellTemplate: function (cellElement, cellInfo) {
        cellElement.dxTextBox({
          value: cellInfo.data.name.fr,
          onValueChanged: function (e) {
            cellInfo.setValue(e.value);
          }
        });

        /*$('<div>').dxMultiLang({
         value: cellInfo.data.name,
         onValueChanged: function (e) {
         cellInfo.setValue(e.value);
         }
         }).appendTo(cellElement);*/
      }
    }, {
      dataField: 'code_alpha2'
    }, {
      dataField: 'code_alpha3'
    }, {
      dataField: 'is_active',
      dataType: 'boolean',
      width: '10%',
      filterValue: true
    }];

    this.editing = {
      mode: 'form',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
      form: {
        colCount: 1,
        items: [{
          label: {
            text: 'name'
          },
          dataField: 'name',
          isRequired: true
        }, {
          label: {
            text: 'codeAlpha2'
          },
          dataField: 'code_alpha2',
          editorOptions: {
            maxLength: 2
          }
        }, {
          label: {
            text: 'codeAlpha3'
          },
          dataField: 'code_alpha3',
          editorOptions: {
            maxLength: 3
          }
        }, {
          label: {
            text: 'isActive'
          },
          dataField: 'is_active',
          editorType: 'dxCheckBox'
        }]
      }
    };
    this.filter = {
      visible: true
    };

    translate.get(['name', 'codeAlpha2', 'codeAlpha3', 'isActive']).subscribe((res: Object) => {
      this.columns[1]['caption'] = res['name'];
      this.columns[2]['caption'] = res['codeAlpha2'];
      this.columns[3]['caption'] = res['codeAlpha3'];
      this.columns[4]['caption'] = res['isActive'];
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  /* ngOnChanges() {
    console.log('change');
  }*/

  onRowUpdated(e) {
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
