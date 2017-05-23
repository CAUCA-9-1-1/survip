import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BuildingHazardousMaterial} from '../../intervention-survey/shared/models/building-hazardous-material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BuildingHazardousMaterialService} from '../../intervention-survey/shared/services/building-hazardous-material.service';
import {HazardousMaterialService} from '../../intervention-survey/shared/services/hazardous-material.service';
import {UnitOfMeasureService} from '../../intervention-survey/shared/services/unit-of-measure.service';
import {UnitOfMeasure} from '../../intervention-survey/shared/models/unit-of-measure';

@Component({
  selector: 'app-intervention-survey-dangerous-material',
  templateUrl: './dangerous-material.component.html',
  styleUrls: ['./dangerous-material.component.styl']
})
export class DangerousMaterialComponent implements OnInit, OnChanges {
  materialForm: FormGroup;
  units: UnitOfMeasure[];
  @Input() item: BuildingHazardousMaterial;
  @Output() deleteClicked = new EventEmitter();

  constructor(
    private matService: BuildingHazardousMaterialService,
    public dangMatService: HazardousMaterialService,
    private unitOfMeasureService: UnitOfMeasureService,
    private fb: FormBuilder) {
    unitOfMeasureService.getList()
      .then(units => this.units = units);
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    this.setValues();
  }
  ngOnChanges() {
    console.log('changed');
  }

  private setValues() {
    if (this.item != null) {
      this.materialForm.patchValue(this.item);
    }
  }

  createForm() {
    this.materialForm = this.fb.group({
      idHazardousMaterial: ['', Validators.required ],
      quantity: [0 ],
      container: [''],
      capacityContainer: ['' ],
      idUnitOfMeasure: ['' ],
      place: [''],
      floor: [''],
      gasInlet: [''],
      securityPerimeter: [''],
      otherInformation: ['']
    });
  }

  onSubmit(form) { }

  private startWatchingForm() {
    this.materialForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.materialForm.valid && this.materialForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving mat...');
    const formModel  = this.materialForm.value;
    Object.assign(this.item, formModel);
    this.matService.update(this.item)
      .then(() => console.log('Mat saved.'));
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.item);
  }
}
