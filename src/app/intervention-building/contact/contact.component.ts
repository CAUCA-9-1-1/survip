import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BuildingContact} from '../../intervention-survey/shared/models/building-contact';
import {BuildingContactService} from '../../intervention-survey/shared/services/building-contact.service';

@Component({
  selector: 'app-intervention-survey-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.styl']
})
export class ContactComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  @Input() item: BuildingContact;
  @Output() deleteClicked = new EventEmitter();

  constructor(
    private contactService: BuildingContactService,
    private fb: FormBuilder) {
    this.createForm();
    this.startWatchingForm();
  }

  private startWatchingForm() {
    this.contactForm.valueChanges
      .debounceTime(500)
      .subscribe(() => this.saveIfValid());
  }

  ngOnChanges() {
    console.log('changed');
  }

  ngOnInit() {
    this.setValues();
  }

  private setValues() {
    if (this.item != null) {
      this.contactForm.patchValue(this.item);
    }
  }

  createForm() {
    this.contactForm = this.fb.group({
      lastName: ['', Validators.required ],
      firstName: ['', Validators.required ],
      phoneNumber: ['' ],
      phoneNumberExtension: ['' ],
      cellphoneNumber: ['' ],
      otherNumber: ['' ],
      otherNumberExtension: ['' ],
      callPriority: [0 ],
      details: ['' ],
    });
  }

  onDeleteClicked() {
    this.deleteClicked.emit(this.item);
  }

  private saveIfValid() {
    if (this.contactForm.valid && this.contactForm.dirty) {
      this.saveForm();
    }
  }

  private saveForm() {
    console.log('saving contact...');
    const formModel  = this.contactForm.value;
    Object.assign(this.item, formModel);
    this.contactService.update(this.item)
      .then(() => console.log('Contact saved.'));
  }
}
