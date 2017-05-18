import {Directive, ElementRef, Renderer2} from '@angular/core';
import * as Hammer from 'hammerjs';

import {DialogsService} from '../services/dialogs.service';
import {WindowRefService} from '../services/window-ref.service';

@Directive({
  selector: '[appPinchZoom]'
})
export class PinchZoomDirective {
  private lastScale = 1;
  private lastPan = [0, 0];

  constructor(
    private el: ElementRef,
    private windowRef: WindowRefService,
    private renderer: Renderer2,
    private dialog: DialogsService
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.listen(this.el.nativeElement, 'click', this.fullZoom.bind(this));
  }

  fullZoom(e) {
    this.dialog.fullscreen('Zoom', '<img src="' + this.el.nativeElement.src + '" />');

    if (this.windowRef.nativeWindow.cordova) {
      setTimeout(this.setPinch.bind(this), 100);
    }
  }

  setPinch(e) {
    const hammerTag = new Hammer(this.windowRef.nativeDocument.querySelectorAll('app-fullscreen-dialog img')[0]);

    hammerTag.get('pinch').set({ enable: true });
    hammerTag.on('pan', (e) => {
      e.target.style.marginLeft = (this.lastPan[0] + e.deltaX) + 'px';
      e.target.style.marginTop = (this.lastPan[1] + e.deltaY) + 'px';
    });
    hammerTag.on('panend', (e) => {
      this.lastPan = [
        (this.lastPan[0] + e.deltaX),
        (this.lastPan[1] + e.deltaY)
      ];
    });
    hammerTag.on('pinch', (e) => {
      e.target.style.transform = 'scale(' + (this.lastScale * e.scale) + ',' + (this.lastScale * e.scale) + ')';
    });
    hammerTag.on('pinchend', (e) => {
      this.lastScale *= e.scale;
    });
  }
}
