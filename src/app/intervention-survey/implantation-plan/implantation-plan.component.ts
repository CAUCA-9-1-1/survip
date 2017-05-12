import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Picture} from '../../shared/interfaces/picture.interface';
import {PictureService} from '../../shared/services/picture.service';

@Component({
  selector: 'app-intervention-survey-implantation-plan',
  templateUrl: './implantation-plan.component.html',
  styleUrls: ['./implantation-plan.component.styl']
})
export class ImplantationPlanComponent implements OnInit, OnChanges {
  private implantationForm: FormGroup;

  @Input() item: Picture;

  constructor(private pictureService: PictureService, private fb: FormBuilder) {
    this.createForm();
    this.startWatchingForm();
  }

  ngOnInit() {
    this.pictureService.get('a3852cc7-4354-47c8-8917-7c861fe87f68').subscribe((picture) => {
      this.item = picture;
      this.setValues();
    });
  }

  ngOnChanges() {
    // console.log('changed');
  }

  createForm() {
    this.implantationForm = this.fb.group({
      picture: [''],
    });
  }

  private setValues() {
    if (this.item != null) {
      this.implantationForm.patchValue(this.item);
    }
  }

  private startWatchingForm() {
    this.implantationForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  private saveIfValid() {
    if (this.implantationForm.valid && this.implantationForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    if (this.item.picture !== this.implantationForm.value['picture']) {
      Object.assign(this.item, this.implantationForm.value);
      this.pictureService.update(this.item).subscribe((response) => console.log('Picture saved.'));
    }
  }
}
