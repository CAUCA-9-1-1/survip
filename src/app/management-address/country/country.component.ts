import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'igo2';

import {Country} from '../shared/models/country.model';
import {CountryService} from '../shared/services/country.service';
import {WindowRefService} from '../../shared/services/window-ref.service';

@Component({
  selector: 'app-management-address-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.styl'],
  providers: [CountryService]
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private countryService: CountryService, private windowRef: WindowRefService, translate: LanguageService) {
    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
    }, {
      dataField: 'codeAlpha2',
      caption: 'codeAlpha2',
    }, {
      dataField: 'codeAlpha3',
      caption: 'codeAlpha3',
    }, {
      dataField: 'isActive',
      dataType: 'boolean',
      caption: 'isActive',
      width: '10%'
    }];

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

  private onCalculateCellValue(data) {
    return (data.name ? data.name['fr'] : '');
  }

  private onEditCellTemplate(cellElement, cellInfo) {
    /*$('<div>').dxMultiLang({
      value: cellInfo.data.name,
      onValueChanged: function (e) {
        cellInfo.setValue(e.value);
      }
    }).appendTo(cellElement);*/
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
