import { Observable } from 'rxjs/Rx';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) { }

  public confirm(title: string, question: string): Observable<boolean> {
    let dialogRef: MdDialogRef<YesNoDialogComponent>;

    dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.question = question;

    return dialogRef.afterClosed();
  }
}
