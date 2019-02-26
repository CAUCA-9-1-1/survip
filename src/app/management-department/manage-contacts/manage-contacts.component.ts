import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {BuildingContactService} from '../shared/services/building-contact.service';
import {InspectionBuildingContactService} from '../../inspection-approval/shared/services/inspection-building-contact.service';
import {BuildingContact} from '../shared/models/building-contact.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-manage-contacts',
    templateUrl: './manage-contacts.component.html',
    styleUrls: ['./manage-contacts.component.scss'],
    providers: [
        InspectionBuildingContactService,
        BuildingContactService,
    ]
})
export class ManageContactsComponent extends GridWithCrudService implements OnInit {
    @Input() service: string;
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.loadData();
    }
    @Input() readOnly: boolean;

    idBuilding: string;
    private labels: any = {};

    constructor(
        private inspectionService: InspectionBuildingContactService,
        private buildingService: BuildingContactService,
        protected translateService: TranslateService
    ) {
        super(translateService);

        this.translateService.get([
            'cannotModifyExternalData'
        ]).subscribe(labels => {
            this.labels = labels;
        });
    }

    setModel(data: any) {
        return BuildingContact.fromJSON(data);
    }

    ngOnInit() { }

    loadData() {
        if (!this.idBuilding || !this.service) {
            return null;
        }

        this.sourceService = (this.service === 'building' ? this.buildingService : this.inspectionService);
        this.loadSource(this.idBuilding);
    }

    onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.isOwner = false;
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
