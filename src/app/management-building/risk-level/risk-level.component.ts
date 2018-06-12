import {Component, OnInit} from '@angular/core';

import {environment} from '../../../environments/environment';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {RiskLevelService} from '../shared/services/risk-level.service';
import {RiskLevel} from '../shared/models/risk-level.model';


@Component({
    selector: 'app-managementbuilding-risklevel',
    templateUrl: './risk-level.component.html',
    styleUrls: ['./risk-level.component.styl'],
    providers: [
        RiskLevelService,
    ]
})
export class RiskLevelComponent extends GridWithCrudService implements OnInit {

    constructor(
        riskLevelService: RiskLevelService
    ) {
        super(riskLevelService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getRiskLevelName(data) {
        const level = RiskLevel.fromJSON(data);

        return level.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
