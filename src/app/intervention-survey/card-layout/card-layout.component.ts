import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {Observable} from 'rxjs/Rx';
import {current} from 'codelyzer/util/syntaxKind';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.styl']
})
export class CardLayoutComponent implements OnInit, AfterViewInit {
  @Input() items: any[];
  @Input() title: string;
  @Input() componentType: string;
  @Output() deleteClick = new EventEmitter();
  @Output() completionClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  currentMode: string;

  constructor(
    private windowRefService: WindowRefService,
    private windowRef: WindowRefService,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.windowRef.nativeWindow.innerWidth >= 700) {
      this.currentMode = 'desktop';
      this.setNewCardSizeForDesktop();
      Observable.timer(1000).subscribe(() => this.setNewCardSizeForDesktop());
    } else {
      this.setNewCardSizeForMobile();
    }

    Observable.fromEvent(this.windowRef.nativeWindow, 'resize')
      .debounceTime(500)
      .subscribe(() => {
        const newMode = this.getCurrentScreenMode();
        if (newMode !== this.currentMode) {
          this.currentMode = newMode;
          this.setNewCardSize();
        }
      });
  }

  private getCurrentScreenMode() {
    return (this.windowRef.nativeWindow.innerWidth >= 700) ? 'desktop' : 'mobile';
  }

  private setNewCardSize() {
    if (this.currentMode === 'desktop') {
      this.setNewCardSizeForDesktop();
    } else {
      this.setNewCardSizeForMobile();
    }
  }

  private setNewCardSizeForDesktop() {
    const items = this.windowRefService.nativeDocument.getElementsByClassName('detail-card mat-card');
    const item = document.getElementById('new-card');
    if (items.length > 1 && item != null) {
      item.style.width = items[0]['offsetWidth'] + 'px';
      item.style.height = items[0]['offsetHeight'] + 'px';
      item.style.padding = '0px';
    }
  }

  private setNewCardSizeForMobile() {
    const item = document.getElementById('new-card');
    if (item != null) {
      item.style.width = '90%';
      item.style.height = '100px';
      item.style.removeProperty('padding');
    }
  }

  onDeleteClicked(value: any) {
    this.deleteClick.emit(value);
  }

  onCompleteSectionClicked(value: any) {
    this.completionClick.emit(value);
  }

  onAddItemClicked(value: any) {
    this.addClick.emit(value);
  }
}
