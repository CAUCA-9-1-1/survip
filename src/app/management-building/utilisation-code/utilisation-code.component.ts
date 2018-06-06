import {Component, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import {RiskLevel} from '../shared/models/risk-level.model';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-managementbuilding-utilisationcode',
    templateUrl: './utilisation-code.component.html',
    styleUrls: ['./utilisation-code.component.styl'],
    providers: [
        UtilisationCodeService,
    ]
})
export class UtilisationCodeComponent extends GridWithCrudService implements OnInit {

    constructor(
        utilisationCodeService: UtilisationCodeService
    ) {
        super(utilisationCodeService);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCodeName(data) {
        const code = UtilisationCode.fromJSON(data);

        return code.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
