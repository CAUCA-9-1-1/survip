import { Injectable } from '@angular/core';

function getWindow(): any {
  return (window || {});
}

function getNavigator(): any {
  return (navigator || {});
}

function getDocument(): any {
  return (document || {});
}

function getClass(name: string): any {
  return new (window[name] || function() {});
}

function getObject(name: string): any {
  return new (window[name] || {});
}

@Injectable()
export class WindowRefService {
  get nativeWindow(): any {
    return getWindow();
  }

  get nativeNavigator(): any {
    return getNavigator();
  }

  get nativeDocument(): any {
    return getDocument();
  }

  public nativeClass(name: string): any {
    return getClass(name);
  }

  public nativeObject(name: string): any {
    return getObject(name);
  }
}
