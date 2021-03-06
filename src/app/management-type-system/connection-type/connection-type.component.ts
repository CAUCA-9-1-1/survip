import {Component, OnInit} from '@angular/core';
import config from '../../../assets/config/config.json';
import {FireHydrantConnectionType} from '../shared/models/fire-hydrant-connection-type.model';
import {FireHydrantConnectionTypeService} from '../shared/services/fire-hydrant-connection-type.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-connection-type',
    templateUrl: './connection-type.component.html',
    styleUrls: ['./connection-type.component.scss'],
    providers: [FireHydrantConnectionTypeService]
})
export class ConnectionTypeComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.connectionTypeService.readOnlyImported;

    constructor(
        private connectionTypeService: FireHydrantConnectionTypeService,
        protected translateService: TranslateService
        ) {
        super(translateService, connectionTypeService);
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

    public onEditingStart(e) {
        this.readOnly = false;
        if (e.data) {
            if (e.data.idExtern) {
                console.log(e);
                this.readOnly = true;
            }
        }
    }
}
