import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-ask-batch-description',
    templateUrl: './ask-batch-description.component.html',
    styleUrls: ['./ask-batch-description.component.scss']
})
export class AskBatchDescriptionComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AskBatchDescriptionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            description: [''],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel(): void {
        this.dialogRef.close();
    }

    create(): void {
        this.dialogRef.close(this.form.value);
    }
}
