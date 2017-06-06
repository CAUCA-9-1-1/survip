import {Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription } from 'rxjs/Subscription';

import {LoaderService} from '../../services/loader.service';
import {Loader} from '../../models/loader.model';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.styl']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: Loader) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
