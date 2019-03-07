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

    constructor(
        private fireHydrantTypeService: FireHydrantTypeService,
        protected translateService: TranslateService
        ) {
        super(translateService, fireHydrantTypeService);
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
