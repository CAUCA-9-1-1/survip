import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {RiskLevel} from '../shared/models/risk-level.model';


@Component({
    selector: 'app-management-system-risk-level',
    templateUrl: './risk-level.component.html',
    styleUrls: ['./risk-level.component.scss'],
    providers: [
        RiskLevelService,
    ]
})
export class RiskLevelComponent extends GridWithCrudService implements OnInit {
    readOnly: boolean;
    public readOnlyImported = !this.riskLevelService.readOnlyImported;

    constructor(
        private riskLevelService: RiskLevelService
    ) {
        super(riskLevelService);
    }

    setModel(data: any) {
        return RiskLevel.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getRiskLevelName(data) {
        const level = RiskLevel.fromJSON(data);

        return level.getLocalization(config.locale);
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
        }
    }
}
