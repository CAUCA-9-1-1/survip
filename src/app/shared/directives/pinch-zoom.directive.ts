import {Directive, ElementRef, Renderer2} from '@angular/core';

import {DialogsService} from '../services/dialogs.service';

@Directive({
  selector: '[appPinchZoom]'
})
export class PinchZoomDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private dialog: DialogsService
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.listen(this.el.nativeElement, 'click', this.fullZoom.bind(this));
  }

  fullZoom(e) {
    this.dialog.fullscreen('Zoom', '<img src="' + this.el.nativeElement.src + '" />');
  }
}
