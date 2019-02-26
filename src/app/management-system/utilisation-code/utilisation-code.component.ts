import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-utilisation-code',
    templateUrl: './utilisation-code.component.html',
    styleUrls: ['./utilisation-code.component.scss'],
    providers: [
        UtilisationCodeService,
    ]
})
export class UtilisationCodeComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.utilisationCodeService.readOnlyImported;
    private labels: any = {};

    constructor(
        private utilisationCodeService: UtilisationCodeService,
        protected translateService: TranslateService
    ) {
        super(translateService, utilisationCodeService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return UtilisationCode.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getCodeName(data) {
        const code = UtilisationCode.fromJSON(data);

        return code.getLocalization(config.locale, 'name');
    }

    onInitNewRow(e) {
        e.data.isActive = true;
    }

    public onEditorPreparing(e: any): void {
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.disabled = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.disabled;
                this.setPopupName(e, this.labels['cannotModifyExternalData']);
            } else {
                this.readOnly = false;
            }
        }
    }
}
