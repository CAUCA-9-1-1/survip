import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {FireHydrantConnectionType} from '../shared/models/fire-hydrant-connection-type.model';
import {FireHydrantConnectionTypeService} from '../shared/services/fire-hydrant-connection-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-management-system-connection-type',
    templateUrl: './connection-type.component.html',
    styleUrls: ['./connection-type.component.scss'],
    providers: [FireHydrantConnectionTypeService]
})
export class ConnectionTypeComponent extends GridWithCrudService implements OnInit {
    readOnly: boolean;
    public readOnlyImported = !this.connectionTypeService.readOnlyImported;

    constructor(private connectionTypeService: FireHydrantConnectionTypeService) {
        super(connectionTypeService);
    }

    setModel(data: any) {
        return FireHydrantConnectionType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = FireHydrantConnectionType.fromJSON(data);

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
}
