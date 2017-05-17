import {Injectable, Input} from '@angular/core';

import {WindowRefService} from './window-ref.service';

@Injectable()
export class CordovaService {
  private delay = 100;

  @Input()
  public isActive = false;
  public success = function() {};
  public failed = function() {};

  constructor(private windowRef: WindowRefService) {
    if (this.windowRef.nativeWindow.cordova) {
      this.isActive = true;
    }
  }

  public execute(pluginName, functionName, options) {
    setTimeout(((e) => {
      this.windowRef.nativeNavigator[pluginName][functionName](this.onSuccess.bind(this), this.onFail.bind(this), options);
    }).bind(this), this.delay);
  }

  private onSuccess() {
    setTimeout(((args, e) => {
      this.success.apply(this, args);
    }).bind(this, arguments), this.delay);
  }

  private onFail(message) {
    console.log(message);

    setTimeout(((args, e) => {
      this.failed.apply(this, args);
    }).bind(this, arguments), this.delay);
  }
}
