import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-add-group',
    templateUrl: './add-group.component.html',
    styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
    public form: FormGroup;

    public constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddGroupComponent>,
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

    public add(): void {
        this.dialogRef.close(this.form.value);
    }
}
