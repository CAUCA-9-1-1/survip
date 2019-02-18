import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {UtilisationCode} from '../shared/models/utilisation-code.model';
import {UtilisationCodeService} from '../shared/services/utilisation-code.service';


@Component({
    selector: 'app-management-system-utilisation-code',
    templateUrl: './utilisation-code.component.html',
    styleUrls: ['./utilisation-code.component.scss'],
    providers: [
        UtilisationCodeService,
    ]
})
export class UtilisationCodeComponent extends GridWithCrudService implements OnInit {
    readOnly: boolean;
    public readOnlyImported = !this.utilisationCodeService.readOnlyImported;

    constructor(
        private utilisationCodeService: UtilisationCodeService
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
                this.setPopupName(e);
            } else {
                this.readOnly = false;
            }
        }
    }

    private setPopupName(e: any) {
        if (this.gridPopup != null && e.editorOptions.disabled) {
            if (this.notLoopPopupName == false) {
                let title = this.gridPopup.option('title');
                this.gridPopup.option('title', title + ' - Modification impossible, car les données sont externe');
                this.notLoopPopupName = true;
            }
        }
    }
}
