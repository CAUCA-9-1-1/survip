import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ConfigurationTemplate} from '../../shared/models/configuration-template.model';

@Component({
  selector: 'app-template-selection',
  templateUrl: './select-template-dialog.component.html',
  styleUrls: ['./select-template-dialog.component.css']
})
export class SelectTemplateDialogComponent implements OnInit {

  form: FormGroup;
  templateIdentifiers: ConfigurationTemplate[];
  isOpenDisabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SelectTemplateDialogComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.templateIdentifiers = data.templateIdentifiers;
  }

  ngOnInit() {
    this.form = this.formBuilder.group([]);
    this.isOpenDisabled = true;
  }

  openExistingTemplate(template: ConfigurationTemplate) {
    this.dialogRef.close(template);
  }

  textAreaEmpty(name: string) {
    this.isOpenDisabled = name.trim().length === 0;
  }

  create(name: string) {
    const template = new ConfigurationTemplate();
    template.name = name;
    template.data = '';
    this.dialogRef.close(template);
  }

  cancel() {
    this.dialogRef.close();
  }
}
