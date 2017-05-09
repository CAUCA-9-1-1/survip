import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BuildingPersonRequiringAssistance} from '../shared/models/building-person-requiring-assistance';
import {PersonRequiringAssistanceType} from '../shared/models/person-requiring-assistance-type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonRequiringAssistanceTypeService} from '../shared/services/person-requiring-assistance-type.service';
import {BuildingPersonRequiringAssistanceService} from '../shared/services/building-person-requiring-assistance.service';

@Component({
  selector: 'app-intervention-survey-person-requiring-assistance',
  templateUrl: './person-requiring-assistance.component.html',
  styleUrls: ['./person-requiring-assistance.component.styl']
})
export class PersonRequiringAssistanceComponent implements OnInit {
  @Input() item: BuildingPersonRequiringAssistance;
  @Output() deleteClicked = new EventEmitter();

  pnapTypes: PersonRequiringAssistanceType[];
  pnapForm: FormGroup;

  constructor(
    private pnapTypeService: PersonRequiringAssistanceTypeService,
    private pnapService: BuildingPersonRequiringAssistanceService,
    private fb: FormBuilder) {

    this.loadPnapTypes();
    this.createForm();
    this.startWatchingForm();
  }

  private startWatchingForm() {
    this.pnapForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  ngOnInit() {
    this.setValues();
  }

  private loadPnapTypes() {
      this.pnapTypeService.getList()
        .then(types => this.pnapTypes = types);
  }

  private setValues() {
    this.pnapForm.patchValue(this.item || new BuildingPersonRequiringAssistance());
  }

  private createForm() {
    this.pnapForm = this.fb.group({
      'idPersonRequiringAssistanceType': ['', Validators.required],
      'dayResidentCount': [0],
      'eveningResidentCount': [0],
      'nightResidentCount': [0],
      'dayIsApproximate': [false],
      'eveningIsApproximate': [false],
      'nightIsApproximate': [false],
      'description': [''],
      'praName': [''],
      'floor': [''],
      'local': [''],
      'contactName': ['', Validators.required],
      'contactPhoneNumber': ['']
    });
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.item);
  }

  private saveIfValid() {
    if (this.pnapForm.valid && this.pnapForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving contact...');
    const formModel  = this.pnapForm.value;
    Object.assign(this.item, formModel);
    this.pnapService.update(this.item)
      .then(() => console.log('Contact saved.'));
  }
}
