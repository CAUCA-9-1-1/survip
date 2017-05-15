import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPinchZoom]'
})
export class PinchZoomDirective {

  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'cursor', 'pointer');
    renderer.listen(el.nativeElement, 'click', this.fullZoom.bind(this));
  }

  fullZoom(e) {
    console.log(e);
  }
}
