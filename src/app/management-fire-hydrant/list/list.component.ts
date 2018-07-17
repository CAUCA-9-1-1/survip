import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';

import config from '../../../assets/config/config.json';
import {FireHydrantService} from '../shared/services/fire-hydrant.service';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {OperatorType} from '../shared/models/operator-type.model';
import {OperatorTypeService} from '../shared/services/operator-type.service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {FireHydrant} from '../shared/models/fire-hydrant.model';


@Component({
    selector: 'app-managementfirehydrant-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        FireHydrantService,
        FireHydrantTypeService,
        OperatorTypeService,
        UnitOfMeasureService,
        CityService,
        LaneService,
    ]
})
export class ListComponent extends GridWithCrudService implements OnInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    @Input()
    set isShow(value: boolean) {
        if (value) {
            this.loadFireHydrantType();
            this.loadOperatorType();
            this.loadUnitOfMeasure();
        }
    }

    fireHydrantTypes: FireHydrantType[] = [];
    cities: any = {};
    lanes: any = {};
    lanesOfCity: any = {};
    operatorTypes: OperatorType[] = [];
    rateUnits: UnitOfMeasure[] = [];
    pressureUnits: UnitOfMeasure[] = [];
    formFields = {
        idLane: null,
        idIntersection: null,
    };
    colors = [{
        id: '#000000',
        color: '#000000',
    }, {
        id: '#FFFFFF',
        color: '#FFFFFF',
    }, {
        id: '#6495ED',
        color: '#6495ED',
    }, {
        id: '#9ACD32',
        color: '#9ACD32',
    }, {
        id: '#FFA500',
        color: '#FFA500',
    }, {
        id: '#FF0000',
        color: '#FF0000',
    }, {
        id: '#FFFF00',
        color: '#FFFF00',
    }, {
        id: '#CB42F4',
        color: '#CB42F4',
    }];

    constructor(
        fireHydrantService: FireHydrantService,
        private fireHydrantTypeService: FireHydrantTypeService,
        private operatorTypeService: OperatorTypeService,
        private unitOfMeasureService: UnitOfMeasureService,
        private cityService: CityService,
        private laneService: LaneService,
    ) {
        super(fireHydrantService);
    }

    setModel(data: any) {
        return FireHydrant.fromJSON(data);
    }

    ngOnInit() {
        this.loadSource();
        this.loadCity();
        this.loadLane();
        this.loadFireHydrantType();
    }

    getFireHydrantTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(config.locale.use);
    }

    getUnitOfMeasureName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(config.locale.use);
    }

    onInitNewRow(e) {
        e.data.color = '#FF0000';
        e.data.isActive = true;
    }

    onEditingStart(e) {
        this.loadLaneByCity(e.data.idCity);
    }

    onEditorPreparing(e) {
        if (e.dataField === 'idCity') {
            e.editorName = 'dxSelectBox';
            e.editorOptions.onValueChanged = (ev) => {
                e.setValue(ev.value);

                this.loadLaneByCity(ev.value);
                if (this.formFields.idLane) {
                    this.formFields.idLane.option('value', '');
                    this.formFields.idIntersection.option('value', '');
                }
            };
        } else if (e.dataField === 'idLane' || e.dataField === 'idIntersection') {
            e.editorName = 'dxLookup';
            e.editorOptions.closeOnOutsideClick = true;
            e.editorOptions.onInitialized = (ev) => {
                this.formFields[e.dataField] = ev.component;
            };
            e.editorOptions.onOpened = (ev) => {
                ev.component.option('dataSource', this.lanesOfCity);
            };
        } else if (e.dataField === 'color') {
            e.editorName = 'dxSelectBox';
            e.editorOptions.fieldTemplate = (data, container) => {
                container.innerHTML = '<div class="dx-texteditor-container">' +
                    '<div class="fireHydrantField">' +
                        '<div class="textbox"><input class="dx-texteditor-input" value="' + data.color + '" readOnly="true" /></div>' +
                        '<div class="fireHydrant" style="background-color: ' + data.color + '"></div>' +
                    '</div>' +
                    '<div class="dx-texteditor-buttons-container"></div>' +
                '</div>';
            };
            e.editorOptions.itemTemplate = (data, index, container) => {
                container.innerHTML = '<div class="fireHydrant" style="background-color: ' + data.color + '"></div>';
            };
        }
    }

    private loadFireHydrantType() {
        this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
    }

    private loadOperatorType() {
        this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getRate().subscribe(data => this.rateUnits = data);
        this.unitOfMeasureService.getPressure().subscribe(data => this.pressureUnits = data);
    }

    private loadCity() {
        this.cityService.localized().subscribe(data => {
            this.cities = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadLane() {
        this.laneService.localized().subscribe(data => {
            this.lanes = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }

    private loadLaneByCity(idCity: string) {
        this.laneService.getAllOfCity(idCity).subscribe(data => {
            this.lanesOfCity = {
                store: data,
                select: ['id', 'name'],
                sort: ['name'],
            };
        });
    }
}
