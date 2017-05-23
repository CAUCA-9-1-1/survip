import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterventionPlanBuilding} from '../../intervention-survey/shared/models/intervention-plan-building';
import {InterventionPlanBuildingService} from '../shared/services/intervention-plan-building.service';
import {ConstructionTypeService} from '../shared/services/construction-type.service';
import {AlarmPanelTypeService} from '../shared/services/alarm-panel-type.service';
import {AlarmPanelType} from '../../intervention-survey/shared/models/alarm-panel-type';
import {ConstructionType} from '../../intervention-survey/shared/models/construction-type';
import {UnitOfMeasureService} from '../../intervention-survey/shared/services/unit-of-measure.service';
import {UnitOfMeasure} from '../../intervention-survey/shared/models/unit-of-measure';
import {PictureService} from '../../shared/services/picture.service';
import {UUID} from 'angular2-uuid';
import {Picture} from '../../shared/interfaces/picture.interface';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.styl']
})
export class BuildingDetailComponent implements OnInit {
  @Input() interventionPlanBuilding: InterventionPlanBuilding;
  buildingForm: FormGroup;
  alarmPanelTypes: AlarmPanelType[];
  constructionTypes: ConstructionType[];
  unitsOfMeasure: UnitOfMeasure[];
  picture: Picture;
  get building() {
    if (this.interventionPlanBuilding != null) {
      return this.interventionPlanBuilding.building;
    } else {
      return null;
    }
  }
  constructor(
    private planBuildingService: InterventionPlanBuildingService,
    private constructionTypeService: ConstructionTypeService,
    private alarmPanelTypeService: AlarmPanelTypeService,
    private unitService: UnitOfMeasureService,
    private pictureService: PictureService,
    private fb: FormBuilder) {

    this.loadAlarmPanelTypes();
    this.loadConstructionTypes();
    this.loadUnitOfMeasure();
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    if (this.interventionPlanBuilding && this.interventionPlanBuilding.idImage === '') {
      this.createNewPictureAndSetValues();
    } else {
      this.loadPictureAndSetValues();
    }
  }

  onSubmit(form) { }

  private loadPictureAndSetValues() {
    if (this.interventionPlanBuilding) {
      this.pictureService.get(this.interventionPlanBuilding.idImage)
        .subscribe(pic => {
          this.picture = pic;
          this.setValues();
        });
    }
  }

  private createNewPictureAndSetValues() {
    this.picture = new Picture();
    this.picture.id = UUID.UUID();
    this.picture.picture = '';
    this.picture.isActive = true;
    this.setValues();
  }

  private loadUnitOfMeasure() {
    this.unitService.getList()
      .then(units => this.unitsOfMeasure = units);
  }

  private loadAlarmPanelTypes() {
    this.alarmPanelTypeService.getList()
      .then(types => this.alarmPanelTypes = types);
  }

  private loadConstructionTypes() {
    this.constructionTypeService.getList()
      .then(types => this.constructionTypes = types);
  }

  private startWatchingForm() {
    this.buildingForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private setValues() {
    if (this.interventionPlanBuilding != null) {
      this.buildingForm.patchValue(this.interventionPlanBuilding);
      this.buildingForm.patchValue({image: this.picture.picture});
    }
  }

  private createForm() {
    this.buildingForm = this.fb.group({
      'buildingPlanNumber': ['', Validators.required],
      'additionalInformation': [''],
      'height': [0],
      'idUnitOfMeasureHeight': [''],
      'estimatedWaterFlow': [0],
      'image': [new Picture()],
      'idUnitOfMeasureEwf': [''],
      'sprinklerLocation': [''],
      'sprinklerType': [''],
      'sprinklerFloor': [''],
      'sprinklerWall': [''],
      'sprinklerSector': [''],
      'idConstructionType': [''],
      'idConstructionTypeForJoist': [''],
      'pipelineLocation': [''],
      'idAlarmPanelType': [''],
      'alarmPanelFloor': [''],
      'alarmPanelWall': [''],
      'alarmPanelSector': ['']
    });
  }

  private saveIfValid() {
    if (this.buildingForm.valid && this.buildingForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving plan building...');
    const formModel  = this.buildingForm.value;
    Object.assign(this.interventionPlanBuilding, formModel);
    this.savePicture();
    this.planBuildingService.update(this.interventionPlanBuilding)
      .then(() => console.log('Plan building saved.'));
  }

  private savePicture(): void {
    const img = this.buildingForm.value['image'];
    if (img !== this.picture.picture) {
      this.picture.picture = img;
      this.pictureService.update(this.picture).subscribe(() => console.log('picture saved.'));
    }
  }
}
