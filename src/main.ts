import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var document: any;

function onDeviceReady() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}

if (environment.production) {
  enableProdMode();
}

if (document.querySelector('script[src="cordova.js"]')) {
  document.addEventListener('deviceready', onDeviceReady, false);
} else {
  onDeviceReady();
}