import {Component, OnInit} from '@angular/core';
import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {RiskLevel} from '../shared/models/risk-level.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-management-system-risk-level',
    templateUrl: './risk-level.component.html',
    styleUrls: ['./risk-level.component.scss'],
    providers: [
        RiskLevelService,
    ]
})
export class RiskLevelComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.riskLevelService.readOnlyImported;

    constructor(
        private riskLevelService: RiskLevelService,
        protected translateService: TranslateService
    ) {
        super(translateService, riskLevelService);
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
}
