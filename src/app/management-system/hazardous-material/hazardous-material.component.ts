import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {HazardousMaterial} from '../shared/models/hazardous-material.model';
import {HazardousMaterialService} from '../shared/services/hazardous-material.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';


@Component({
    selector: 'app-management-system-hazardous-material',
    templateUrl: './hazardous-material.component.html',
    styleUrls: ['./hazardous-material.component.scss'],
    providers: [
        HazardousMaterialService,
    ]
})
export class HazardousMaterialComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.hazardousMaterialService.readOnlyImported;
    
    constructor(
        private hazardousMaterialService: HazardousMaterialService
    ) {
        super(hazardousMaterialService);
    }

    setModel(data: any) {
        return HazardousMaterial.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getMaterialName(data) {
        const material = HazardousMaterial.fromJSON(data);

        return material.getLocalization(config.locale);
    }

    onInitNewRow(e) {
        e.data = Object.assign(new HazardousMaterial(), {});
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
        }
    }
}
