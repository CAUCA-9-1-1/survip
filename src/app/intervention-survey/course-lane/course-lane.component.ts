import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-intervention-survey-course-lane',
  templateUrl: './course-lane.component.html',
  styleUrls: ['./course-lane.component.styl']
})
export class CourseLaneComponent implements OnInit {
  @Input() street: any;
  @Input() item: object;

  private courseLaneForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
  }

  private setValues() {
    if (this.item != null) {
      this.courseLaneForm.patchValue(this.item);
    }
  }

  private createForm() {
    this.courseLaneForm = this.fb.group({
      sequence: [''],
      idLane: [''],
      direction: [''],
    });
  }

  private startWatchingForm() {
    this.courseLaneForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.courseLaneForm.valid && this.courseLaneForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    Object.assign(this.item, this.courseLaneForm.value);

    // this.iService.update(this.item).subscribe(() => console.log('Contact saved.'));
  }
}
