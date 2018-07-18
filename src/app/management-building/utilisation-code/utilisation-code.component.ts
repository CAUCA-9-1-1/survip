import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';


@Component({
    selector: 'app-managementbuilding-utilisationcode',
    templateUrl: './utilisation-code.component.html',
    styleUrls: ['./utilisation-code.component.scss'],
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

    setModel(data: any) {
        return UtilisationCode.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCodeName(data) {
        const code = UtilisationCode.fromJSON(data);

        return code.getLocalization(config.locale, 'description');
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }
}
