import { Component, OnInit } from '@angular/core';

import config from '../../../assets/config/config.json';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-management-system-fire-hydrant-type',
    templateUrl: './fire-hydrant-type.component.html',
    styleUrls: ['./fire-hydrant-type.component.scss'],
    providers: [FireHydrantTypeService]
})
export class FireHydrantTypeComponent extends GridWithCrudService implements OnInit {
    readOnly: boolean;
    public readOnlyImported = !this.fireHydrantTypeService.readOnlyImported;

    constructor(private fireHydrantTypeService: FireHydrantTypeService) {
        super(fireHydrantTypeService);
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
                this.setPopupName(e);
            } else {
                this.readOnly = false;
            }
        } else {
            this.readOnly = true;
        }
    }

    private setPopupName(e: any) {
        if (this.gridPopup != null && e.editorOptions.disabled) {
            if (this.notLoopPopupName == false) {
                let title = this.gridPopup.option('title');
                this.gridPopup.option('title', title + ' - Modification impossible, car les données sont externe');
                this.notLoopPopupName = true;
            }
        }
    }
}
