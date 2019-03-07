import { Component, OnInit } from '@angular/core';
import config from '../../../assets/config/config.json';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-management-system-unit-of-measure',
    templateUrl: './unit-of-measure.component.html',
    styleUrls: ['./unit-of-measure.component.scss'],
    providers: [UnitOfMeasureService]
})
export class UnitOfMeasureComponent extends GridWithCrudService implements OnInit {
    measureTypes: any = {store: []};
    public readOnlyImported = !this.unitOfMeasureService.readOnlyImported;
    private labels: any = {};

    constructor(
        protected translateService: TranslateService,
        private unitOfMeasureService: UnitOfMeasureService
    ) {
      super(translateService, unitOfMeasureService);

      translateService.get([
        'rate', 'pressure', 'diameter', 'capacity', 'dimension',
      ]).subscribe(labels => {
        this.labels = labels;
        const types = [];
        types.push({id: 0, name: labels['rate']});
        types.push({id: 1, name: labels['pressure']});
        types.push({id: 2, name: labels['diameter']});
        types.push({id: 3, name: labels['capacity']});
        types.push({id: 4, name: labels['dimension']});
        this.measureTypes = {
          store: types,
          select: ['id', 'name'],
          sort: ['name'],
        };
      });
    }

    setModel(data: any) {
        return UnitOfMeasure.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getUnitName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onEditorPreparing(e) {
        if (e.row != null && e.row.data != null) {
            if (e.row.data.idExtern != null) {
                e.editorOptions.readOnly = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
    }
}
