import { Component, OnInit } from '@angular/core';

import config from '../../../assets/config/config.json';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-fire-hydrant-type',
    templateUrl: './fire-hydrant-type.component.html',
    styleUrls: ['./fire-hydrant-type.component.scss'],
    providers: [FireHydrantTypeService]
})
export class FireHydrantTypeComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.fireHydrantTypeService.readOnlyImported;
    private labels: any = {};

    constructor(
        private fireHydrantTypeService: FireHydrantTypeService,
        protected translateService: TranslateService
        ) {
        super(translateService, fireHydrantTypeService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return FireHydrantType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;

                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        } else {
            this.readOnly = true;
        }
    }
}
