import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';

import {FireHydrantService} from '../shared/services/fire-hydrant.service';
import {FireHydrantType} from '../shared/models/fire-hydrant-type.model';
import {FireHydrantTypeService} from '../shared/services/fire-hydrant-type.service';
import {Lane} from '../../management-address/shared/models/lane.model';
import {LaneService} from '../../management-address/shared/services/lane.service';
import {OperatorType} from '../shared/models/operator-type.model';
import {OperatorTypeService} from '../shared/services/operator-type.service';
import {UnitOfMeasure} from '../shared/models/unit-of-measure.model';
import {UnitOfMeasureService} from '../shared/services/unit-of-measure.service';
import {GridWithCrudService} from '../../shared/classes/grid-with-crud-service';
import {CityService} from '../../management-address/shared/services/city.service';
import {City} from '../../management-address/shared/models/city.model';
import {DxDataGridComponent} from 'devextreme-angular';


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
export class ListComponent extends GridWithCrudService implements OnInit, AfterViewInit {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

    fireHydrantTypes: FireHydrantType[] = [];
    cities: City[] = [];
    lanes: Lane[] = [];
    lanesOfCity: Lane[] = [];
    intersections: Lane[] = [];
    operatorTypes: OperatorType[] = [];
    unitOfMeasures: UnitOfMeasure[] = [];

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

    ngOnInit() {
        this.loadSource();
        this.loadFireHydrantType();
        this.loadOperatorType();
        this.loadUnitOfMeasure();
        this.loadCity();
        this.loadLane();
    }

    ngAfterViewInit() {
        this.dataGrid.instance.option({
            onEditingStart: (e) => {
                this.loadLaneByCity(e.data.idCity);
            },
            onEditorPreparing: (e) => {
                if (e.dataField === 'idCity') {
                    e.editorOptions.type = 'dxSelectBox';
                    e.editorOptions.onValueChanged = (ev) => {
                        this.loadLaneByCity(ev.value);
                    };
                } else if (e.dataField === 'idLane') {
                    e.editorOptions.type = 'dxSelectBox';
                    e.editorOptions.onOpened = (ev) => {
                        ev.component.option('dataSource', this.lanesOfCity);
                    };
                }
            }
        });
    }

    getFireHydrantTypeName(data) {
        const type = FireHydrantType.fromJSON(data);

        return type.getLocalization(environment.locale.use);
    }

    getCityName(data) {
        const city = City.fromJSON(data);

        return city.getLocalization(environment.locale.use);
    }

    getLaneName(data) {
        if (data.localizations) {
            const lane = Lane.fromJSON(data);

            return lane.getLocalization(environment.locale.use);
        } else {
            return data.name;
        }
    }

    getIntersectionName(data) {
        return '';
    }

    getUnitOfMeasureName(data) {
        const unit = UnitOfMeasure.fromJSON(data);

        return unit.getLocalization(environment.locale.use);
    }

    onInitNewRow(e) {
        e.data.color = 'rgba(255, 0, 0, 1)';
        e.data.isActive = true;
    }

    private loadFireHydrantType() {
        this.fireHydrantTypeService.getAll().subscribe(data => this.fireHydrantTypes = data);
    }

    private loadOperatorType() {
        this.operatorTypeService.getAll().subscribe(data => this.operatorTypes = data);
    }

    private loadUnitOfMeasure() {
        this.unitOfMeasureService.getAll().subscribe(data => this.unitOfMeasures = data);
    }

    private loadCity() {
        this.cityService.getAll().subscribe(data => this.cities = data);
    }

    private loadLane() {
        this.laneService.getAll().subscribe(data => this.lanes = data);
    }

    private loadLaneByCity(idCity: string) {
        this.laneService.getAllOfCity(idCity).subscribe(data => this.lanesOfCity = data);
    }
}
