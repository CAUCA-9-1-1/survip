import {Component, OnInit} from '@angular/core';

import config from '../../../assets/config/config.json';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {PersonRequiringAssistanceType} from '../shared/models/person-requiring-assistance-type.model';
import {PersonRequiringAssistanceTypeService} from '../shared/services/person-requiring-assistance-type.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-management-system-person-requiring-assistance-type',
    templateUrl: './person-requiring-assistance-type.component.html',
    styleUrls: ['./person-requiring-assistance-type.component.scss'],
    providers: [
        PersonRequiringAssistanceTypeService,
    ]
})
export class PersonRequiringAssistanceTypeComponent extends GridWithCrudService implements OnInit {
    public readOnlyImported = !this.personRequiringAssistanceTypeService.readOnlyImported;
    private labels: any = {};

    constructor(
        private personRequiringAssistanceTypeService: PersonRequiringAssistanceTypeService,
        protected translateService: TranslateService
    ) {
        super(translateService, personRequiringAssistanceTypeService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return PersonRequiringAssistanceType.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
    }

    getTypeName(data) {
        const type = PersonRequiringAssistanceType.fromJSON(data);

        return type.getLocalization(config.locale);
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
        } else {
            this.readOnly = true;
        }
    }
}
