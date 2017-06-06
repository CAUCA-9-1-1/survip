import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Loader} from '../models/loader.model';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<Loader>();

  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(<Loader>{show: true});
  }

  hide() {
    this.loaderSubject.next(<Loader>{show: false});
  }
}
