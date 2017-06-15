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
    private windowRef?: WindowRefService,
    private dialog?: DialogsService,
    private el?: ElementRef,
    private renderer?: Renderer2,
  ) {
    if (this.renderer) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');

      if (this.fullZoom) {
        this.renderer.listen(this.el.nativeElement, 'click', this.fullZoom.bind(this));
      }
    }
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
    hammerTag.on('pan', (event) => {
      event.target.style.marginLeft = (this.lastPan[0] + e.deltaX) + 'px';
      event.target.style.marginTop = (this.lastPan[1] + e.deltaY) + 'px';
    });
    hammerTag.on('panend', (event) => {
      this.lastPan = [
        (this.lastPan[0] + event.deltaX),
        (this.lastPan[1] + event.deltaY)
      ];
    });
    hammerTag.on('pinch', (event) => {
      event.target.style.transform = 'scale(' + (this.lastScale * event.scale) + ',' + (this.lastScale * event.scale) + ')';
    });
    hammerTag.on('pinchend', (event) => {
      this.lastScale *= event.scale;
    });
  }
}
