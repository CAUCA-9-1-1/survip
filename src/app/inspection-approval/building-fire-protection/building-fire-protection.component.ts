import {Component, Input, OnInit} from '@angular/core';

import {InspectionBuildingFireProtectionService} from '../shared/services/inspection-building-fire-protection.service';
import {StaticDataService} from '../../shared/services/static-data.service';


@Component({
    selector: 'app-building-fire-protection',
    templateUrl: './building-fire-protection.component.html',
    styleUrls: ['./building-fire-protection.component.scss'],
    providers: [
        InspectionBuildingFireProtectionService,
        StaticDataService,
    ]
})
export class BuildingFireProtectionComponent implements OnInit {
    @Input()
    set building(id: string) {
        this.idBuilding = id;
        this.sprinklers = [];
        this.alarmPanels = [];
        this.loadData();
    }

    private idBuilding: string;

    public walls: any = [];
    public sectors: any = [];
    public sprinklers: any = [];
    public alarmPanels: any = [];
    public sprinklerTypes: any = [];
    public alarmPanelTypes: any = [];

    public constructor(
        private inspectionBuildingFireProtectionService: InspectionBuildingFireProtectionService,
        private staticService: StaticDataService,
    ) { }

    public ngOnInit() {
        this.walls = this.staticService.getWalls();
        this.sectors = this.staticService.getSectors();
        this.staticService.getSprinklerType().subscribe(data => this.sprinklerTypes = data);
        this.staticService.getAlarmPanelType().subscribe(data => this.alarmPanelTypes = data);
    }

    public onEditorPreparing(e) {
        if (e.dataField === 'wall' || e.dataField === 'sector') {
            e.editorName = 'dxSelectBox';
            e.editorOptions = {
                value: e.value,
                items: (e.dataField === 'wall' ? this.walls : this.sectors),
                onValueChanged: (ev) => {
                    e.setValue(ev.value);
                }
            };
        }
    }

    public onInitNewRow(e) {
        e.data.isActive = true;
        e.data.idBuilding = this.idBuilding;
    }

    public onAlarmPanelInserted(e) {
        this.inspectionBuildingFireProtectionService.saveAlarmPanel(e.data).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getAlarmPanel(this.idBuilding).subscribe(data => this.alarmPanels = data);
        });
    }

    public onAlarmPanelUpdated(e) {
        this.inspectionBuildingFireProtectionService.saveAlarmPanel(e.key).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getAlarmPanel(this.idBuilding).subscribe(data => this.alarmPanels = data);
        });
    }

    public onAlarmPanelRemoved(e) {
        this.inspectionBuildingFireProtectionService.removeAlarmPanel(e.key.id).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getAlarmPanel(this.idBuilding).subscribe(data => this.alarmPanels = data);
        });
    }

    public onSprinklerInserted(e) {
        this.inspectionBuildingFireProtectionService.saveSprinkler(e.data).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getSprinkler(this.idBuilding).subscribe(data => this.sprinklers = data);
        });
    }

    public onSprinklerUpdated(e) {
        this.inspectionBuildingFireProtectionService.saveSprinkler(e.key).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getSprinkler(this.idBuilding).subscribe(data => this.sprinklers = data);
        });
    }

    public onSprinklerRemoved(e) {
        this.inspectionBuildingFireProtectionService.removeSprinkler(e.key.id).subscribe(() => {
            this.inspectionBuildingFireProtectionService.getSprinkler(this.idBuilding).subscribe(data => this.sprinklers = data);
        });
    }

    private loadData() {
        if (!this.idBuilding) {
            return null;
        }

        this.inspectionBuildingFireProtectionService.getSprinkler(this.idBuilding).subscribe(data => this.sprinklers = data);
        this.inspectionBuildingFireProtectionService.getAlarmPanel(this.idBuilding).subscribe(data => this.alarmPanels = data);
    }
}

