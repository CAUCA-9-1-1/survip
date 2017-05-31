import {Injectable} from '@angular/core';

@Injectable()
export class EditDatagrid {

  constructor() { }

  protected onCalculateCellValue(data) {
    return (data.name ? data.name['fr'] : '');
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
