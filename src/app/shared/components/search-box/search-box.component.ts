import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef, EventEmitter, forwardRef, OnChanges
} from '@angular/core';
import {SearchListComponent} from '../search-list/search-list.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.styl'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBoxComponent),
      multi: true
    }
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;
  selectedItemDescription: string;
  @Input() readOnly: boolean;
  @Input() placeHolderText: string;
  @Input() descriptionField: string;
  @Input() keyField: string;
  @Input() dataService: ServiceForListInterface;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input('currentId') _currentId: string;

  get currentId() {
    return this._currentId;
  }
  set currentId(val) {
    this._currentId = val;
    this.showSelectionDescription();
    this.propagateChange(this.currentId);
    this.selectedIdChange.emit(this.currentId);
  }

  propagateChange: any = () => {};
  writeValue(value: any) {
    this.currentId = value;
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
    this.readOnly = false;
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.componentRef != null) {
      this.componentRef.destroy();
    }
  }
  ngOnChanges(inputs) {
    this.propagateChange(this.currentId);
  }

  onClick() {
    if (this.readOnly === false) {
      this.createComponent();
    }
  }
  private createComponent() {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(SearchListComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.dataService = this.dataService;
    this.componentRef.instance.keyField = this.keyField;
    this.componentRef.instance.descriptionField = this.descriptionField;
    this.componentRef.instance.loadData();
    this.componentRef.instance.selectedItemChanged.subscribe(event => this.onSelectionChanged(event));
    this.componentRef.instance.selectionCancelled.subscribe(event => this.onSelectionCancelled());
  }
  private onSelectionChanged(selectedId: string) {
    this.currentId = selectedId;
    this.selectedIdChange.emit(selectedId);
    this.destroyComponent();
    this.showSelectionDescription();
  };

  private showSelectionDescription() {
    if (this.currentId == null) {
      this.selectedItemDescription = '';
    } else {
      this.dataService
        .getDescriptionById(this._currentId)
        .then(description => this.selectedItemDescription = description);
    }
  }
  private onSelectionCancelled() {
    this.destroyComponent();
  };
  private destroyComponent() {
    this.componentRef.instance.selectedItemChanged.unsubscribe();
    this.container.clear();
  }
}
