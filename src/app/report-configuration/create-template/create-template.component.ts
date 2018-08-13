import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../../shared/models/configuration-template.model';

@Component({
  selector: 'app-template-selection',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {

  form: FormGroup;
  templateIdentifiers: ConfigurationTemplate[];
  isDisabled: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTemplateComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.templateIdentifiers = data.templateIdentifiers;
  }

  ngOnInit() {
    this.form = this.fb.group([]);
    this.isDisabled = true;
  }

  openExistingTemplate(template: ConfigurationTemplate) {
    this.dialogRef.close(template);
  }

  textAreaEmpty(name: string) {
    this.isDisabled = name.trim().length === 0;
  }

  create(name: string) {
  }

  cancel() {
    this.dialogRef.close();
  }
}
