import {Injectable} from '@angular/core';
import {MdDialogRef, MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Rx';

import {WindowRefService} from './window-ref.service';
import {YesNoDialogComponent} from '../components/yes-no-dialog/yes-no-dialog.component';
import {FullscreenDialogComponent} from '../components/fullscreen-dialog/fullscreen-dialog.component';
import {WaitDialogComponent} from '../components/wait-dialog/wait-dialog.component';

@Injectable()
export class DialogsService {

  constructor(
    private dialog: MdDialog,
    private windowRef: WindowRefService
  ) { }

  public confirm(title: string, question: string): Observable<boolean> {
    let dialogRef: MdDialogRef<YesNoDialogComponent>;

    dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.question = question;

    return dialogRef.afterClosed();
  }

  public fullscreen(title: string, content: string): Observable<boolean> {
    let dialogRef: MdDialogRef<FullscreenDialogComponent>;

    dialogRef = this.dialog.open(FullscreenDialogComponent, {
      width: (this.windowRef.nativeWindow.innerWidth < 700 ? '100%' : '95%'),
      height: (this.windowRef.nativeWindow.innerWidth < 700 ? '100%' : '95%'),
    });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;

    return dialogRef.afterClosed();
  }

  public wait() {
    let dialogRef: MdDialogRef<WaitDialogComponent>;

    dialogRef = this.dialog.open(WaitDialogComponent, {
      width: '200px',
    });

    return dialogRef;
  }
}
