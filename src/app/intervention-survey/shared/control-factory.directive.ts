import {
  Directive,
  Component,
  ComponentFactory,
  OnChanges,
  Input,
  ViewContainerRef,
  Compiler,
  ComponentFactoryResolver, OnDestroy, Type, Output, EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';


@Directive({
  selector: '[appCtrlFactory]'
})
export class CardLayoutFactoryDirective implements OnChanges, OnDestroy {
  @Input() comp: string;
  @Input() item: any;
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  componentRef;
  init = false;

  constructor(
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver) { }

  ngOnChanges() {
    if (!this.comp || this.init) {
      return;
    }
    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass: any = factories.find((x: any) => x.name === this.comp);
    const factory = this.resolver.resolveComponentFactory(factoryClass);
    const compRef = this.vcRef.createComponent(factory);
    compRef.instance['item'] = this.item;
    const clickHandler: EventEmitter<any> = compRef.instance['deleteClicked'];
    clickHandler.subscribe(event => this.deleteClick.emit(event));
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.componentRef = compRef;
    this.init = true;
  }

  public ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
