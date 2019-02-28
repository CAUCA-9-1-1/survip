import {Component, Input, OnInit} from '@angular/core';

import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {BuildingPnapsService} from '../shared/services/building-pnaps.service';
import {InspectionBuildingPnapsService} from '../../inspection-approval/shared/services/inspection-building-pnaps.service';
import {PersonRequiringAssistanceTypeService} from '../../management-type-system/shared/services/person-requiring-assistance-type.service';
import {PersonRequiringAssistanceType} from '../../management-type-system/shared/models/person-requiring-assistance-type.model';
import {BuildingPnaps} from '../shared/models/building-pnaps.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-manage-pnaps',
    templateUrl: './manage-pnaps.component.html',
    styleUrls: ['./manage-pnaps.component.scss'],
    providers: [
        InspectionBuildingPnapsService,
        BuildingPnapsService,
        PersonRequiringAssistanceTypeService,
    ]
})
export class ManagePnapsComponent extends GridWithCrudService implements OnInit {
    @Input() service: string;
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.loadData();
    }
    @Input() readOnly: boolean;

    idBuilding: string;
    pnapsType:  any = {store: []};
    private labels: any = {};

    constructor(
        private inspectionService: InspectionBuildingPnapsService,
        private buildingService: BuildingPnapsService,
        private pnapsTypeService: PersonRequiringAssistanceTypeService,
        protected translateService: TranslateService
    ) {
        super(translateService);
    }

    setModel(data: any) {
        return BuildingPnaps.fromJSON(data);
    }

    ngOnInit() {
        this.loadType();
    }

    loadData() {
        if (!this.idBuilding || !this.service) {
            return null;
        }

        this.sourceService = (this.service === 'building' ? this.buildingService : this.inspectionService);
        this.loadSource(this.idBuilding);
    }

    onEditorPreparing(e) {
        if (e.dataField === 'description') {
            e.editorName = 'dxTextArea';
        }
        
        if(e.row != null && e.row.data != null) {
            if(e.row.data.idExtern != null) {
                e.editorOptions.readOnly = e.row.data.idExtern.toString() != null;
                this.readOnly = e.editorOptions.readOnly;
            } else {
                this.readOnly = false;
            }
        }
    }

    onInitNewRow(e) {
        e.data.idBuilding = this.idBuilding;
        e.data.dayIsApproximate = false;
        e.data.eveningIsApproximate = false;
        e.data.nightIsApproximate = false;
        e.data.isActive = true;
    }

    private loadType() {
        this.pnapsTypeService.localized().subscribe(data => this.pnapsType = {
            store: data,
            select: ['id', 'name'],
            sort: ['name'],
          });
    }
}
