import {Injectable} from '@angular/core';
import {MdDialogRef, MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Rx';

import {WindowRefService} from './window-ref.service';
import {YesNoDialogComponent} from '../components/yes-no-dialog/yes-no-dialog.component';
import {FullscreenDialogComponent} from '../components/fullscreen-dialog/fullscreen-dialog.component';
import {WaitDialogComponent} from '../components/wait-dialog/wait-dialog.component';

@Injectable()
export class DialogsService {
  private dialogRef: MdDialogRef<WaitDialogComponent|FullscreenDialogComponent|YesNoDialogComponent>;

  constructor(
    private dialog: MdDialog,
    private windowRef: WindowRefService
  ) { }

  public close() {
    const modal = this.windowRef.nativeDocument.querySelectorAll('body .modal');

    if (modal.length > 0) {
      modal[0].parentNode.removeChild(modal[0]);
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public confirm(title: string, question: string): Observable<boolean> {
    let dialogRef: MdDialogRef<YesNoDialogComponent>;

    dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.question = question;

    this.dialogRef = dialogRef;

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

    this.dialogRef = dialogRef;

    return dialogRef.afterClosed();
  }

  public wait() {
    const body = this.windowRef.nativeDocument.querySelectorAll('body')[0];
    const div = this.windowRef.nativeDocument.createElement('div');

    div.className = 'modal';
    div.innerHTML = '<div class="content"><h1>Veuillez patienter</h1><img src="./assets/images/spinner.gif" /></div>';
    body.appendChild(div);

    /* Angular MdDialog doesn't close when we come back of other app with cordova

    let dialogRef: MdDialogRef<WaitDialogComponent>;

    dialogRef = this.dialog.open(WaitDialogComponent);

    this.dialogRef = dialogRef;

    return dialogRef.afterClosed();*/
  }
}
