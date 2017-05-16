import {Injectable, Input} from '@angular/core';

import {WindowRefService} from './window-ref.service';
import {DialogsService} from './dialogs.service';

@Injectable()
export class CordovaService {
  private delay = 100;

  @Input()
  public isActive = false;
  public success = function() {};
  public failed = function() {};

  constructor(
    private windowRef: WindowRefService,
    private dialogService: DialogsService,
  ) {
    if (this.windowRef.nativeWindow.cordova) {
      this.isActive = true;
    }
  }

  public execute(pluginName, functionName, options) {
    this.dialogService.wait().subscribe((e) => {
      console.log('ask to close');
    });

    setTimeout(((e) => {
      this.windowRef.nativeNavigator[pluginName][functionName](this.onSuccess.bind(this), this.onFail.bind(this), options);
    }).bind(this), this.delay);
  }

  private onSuccess() {
    setTimeout(((args, e) => {
      this.dialogService.close();
      this.success.apply(this, args);
    }).bind(this, arguments), this.delay);
  }

  private onFail(message) {
    console.log(message);

    setTimeout(((args, e) => {
      this.dialogService.close();
      this.failed.apply(this, args);
    }).bind(this, arguments), this.delay);
  }
}
