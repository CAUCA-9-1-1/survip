import {Injectable} from '@angular/core';

@Injectable()
export class EditDatagrid {

  constructor() { }

  protected onCalculateCellValue(field, data) {
    if (typeof (data) === 'undefined') {
      data = field;
      field = 'name';
    }

    return (data[field] ? data[field]['fr'] : '');
  }

  protected onEditCellTemplate(cellElement, cellInfo) {
    /*$('<div>').dxMultiLang({
      value: cellInfo.data.name,
      onValueChanged: function (e) {
        cellInfo.setValue(e.value);
      }
    }).appendTo(cellElement);*/
  }
}
