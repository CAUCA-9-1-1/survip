import { Injectable } from '@angular/core';

function getWindow (): any {
  return window;
}

function getNavigator (): any {
  return navigator;
}

function getDocument (): any {
  return document;
}


@Injectable()
export class WindowRefService {
  get nativeWindow (): any {
    return getWindow();
  }

  get nativeNavigator (): any {
    return getNavigator();
  }

  get nativeDocument (): any {
    return getDocument();
  }
}
