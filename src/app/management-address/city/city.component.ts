import {Component, OnInit} from '@angular/core';
import {City} from '../shared/models/city.model';
import {CityService} from '../shared/services/city.service';

@Component({
  selector: 'app-management-address-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.styl'],
  providers: [CityService]
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  columns: object[] = [];
  editing: object = {};
  filter: object = {};

  constructor(private cityService: CityService) {
    this.columns = [{
      dataField: 'name',
      caption: 'name',
      calculateCellValue: this.onCalculateCellValue.bind(this),
      editCellTemplate: this.onEditCellTemplate.bind(this)
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

    this.cityService.update(e.key).subscribe(info => {
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
    this.cityService.getAll().subscribe(infoCity => {
      if (!infoCity.success) {
        console.error(infoCity.error);
      }

      this.cities = infoCity.data;
    });
  }
}
