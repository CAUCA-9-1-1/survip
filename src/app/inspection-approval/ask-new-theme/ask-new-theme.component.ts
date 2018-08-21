import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-ask-new-theme',
    templateUrl: './ask-new-theme.component.html',
    styleUrls: ['./ask-new-theme.component.scss']
})
export class AskNewThemeComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AskNewThemeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            name: [''],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    create(): void {
        if (this.form.value.name) {
            this.dialogRef.close(this.form.value);
        }
    }
}
