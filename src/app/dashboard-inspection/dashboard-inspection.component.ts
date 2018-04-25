import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';

import {InspectionService} from './shared/services/inspection.service';
import {LaneService} from '../management-address/shared/services/lane.service';
import {Lane} from '../management-address/shared/models/lane.model';


@Component({
    selector: 'app-dashboard-inspection',
    templateUrl: './dashboard-inspection.component.html',
    styleUrls: ['./dashboard-inspection.component.scss'],
    providers: [
        InspectionService,
        LaneService,
    ]
})
export class DashboardInspectionComponent implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    dataSource: any[];
    lanes: Lane[];
    selectedMode = 'mode4';
    searchWidth = (screen.width / 2);

    constructor(
        private inspectionService: InspectionService,
        private laneService: LaneService,
    ) { }

    ngOnInit() {
        this.loadData();
        this.loadLanes();
    }

    ngAfterViewInit() {
        this.setDatagrid();
    }

    private setDatagrid() {
        let columns = {};

        switch (this.selectedMode) {
            case 'mode1':
                columns = [{
                    dataField: 'idSurvey'
                }, {
                    dataField: 'idBuilding'
                }];
                break;
            case 'mode4':
                columns = [{
                    dataField: 'civicNumber',
                }, {
                    dataField: 'civicSupp',
                }, {
                    dataField: 'civicLetter',
                }, {
                    dataField: 'civicLetterSupp',
                }, {
                    dataField: 'suite',
                }, {
                    dataField: 'appartmentNumber',
                }, {
                    dataField: 'floor',
                }, {
                    dataField: 'idLane',
                    lookup: {
                        dataSource: this.lanes,
                        valueExpr: 'id',
                        displayExpr: (data) => {
                            console.log(data);
                        }
                    },
                }, {
                    dataField: 'idLaneTransversal',
                    lookup: {
                        dataSource: this.lanes,
                        valueExpr: 'id',
                        displayExpr: (data) => {
                            console.log(data);
                        }
                    },
                }, {
                    dataField: 'postalCode',
                }, {
                    dataField: 'idRiskLevel',
                }, {
                    dataField: 'idUtilisationCode',
                }, {
                    dataField: 'idPicture',
                }, {
                    dataField: 'buildingValue',
                    visible: false,
                }, {
                    dataField: 'isParent',
                }, {
                    dataField: 'idParentBuilding',
                }, {
                    dataField: 'childType',
                    visible: false,
                }, {
                    dataField: 'matricule',
                    visible: false,
                }, {
                    dataField: 'coordinates',
                    visible: false,
                }, {
                    dataField: 'coordinatesSource',
                    visible: false,
                }, {
                    dataField: 'numberOfAppartment',
                    visible: false,
                }, {
                    dataField: 'numberOfBuilding',
                    visible: false,
                }, {
                    dataField: 'numberOfFloor',
                    visible: false,
                }, {
                    dataField: 'showInResources',
                    visible: false,
                }, {
                    dataField: 'source',
                    visible: false,
                }, {
                    dataField: 'utilisationDescription',
                    visible: false,
                }, {
                    dataField: 'vacantLand',
                    //visible: false,
                }, {
                    dataField: 'yearOfConstruction',
                    visible: false,
                }, {
                    dataField: 'details',
                    visible: false,
                }];
                break;
            default:
                columns = {};
                break;
        }

        this.dataGrid.instance.option({
            filterRow: {
                visible: true,
            },
            columns: columns,
        });
    }

    private loadData() {
        switch (this.selectedMode) {
            case 'mode1':
                this.inspectionService.getToDo().subscribe(data => this.dataSource = data);
                break;
            case 'mode4':
                this.inspectionService.getBuildingToDo().subscribe(data => this.dataSource = data);
                break;
            default:
                this.dataSource = [];
                break;
        }
    }

    private loadLanes() {
        this.laneService.getAll().subscribe(data => this.lanes = data);
    }
}
