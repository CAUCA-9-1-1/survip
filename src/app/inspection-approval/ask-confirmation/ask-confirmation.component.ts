import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-ask-confirmation',
    templateUrl: './ask-confirmation.component.html',
    styleUrls: ['./ask-confirmation.component.scss']
})
export class AskConfirmationComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AskConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            reason: [''],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        if ((this.data.title === 'refuse' && this.form.value.reason) || this.data.title !== 'refuse') {
            this.dialogRef.close(this.form.value);
        }
    }
}
