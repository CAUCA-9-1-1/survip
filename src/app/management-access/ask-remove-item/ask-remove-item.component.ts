import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-add-group',
    templateUrl: './ask-remove-item.component.html',
    styleUrls: ['./ask-remove-item.component.scss']
})
export class AskRemoveItemComponent implements OnInit {
    public form: FormGroup;

    public constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AskRemoveItemComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public ngOnInit() {
        this.form = this.fb.group({
            description: [''],
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    public remove(): void {
        this.dialogRef.close(true);
    }
}
