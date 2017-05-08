import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef, EventEmitter, AfterViewInit
} from '@angular/core';
import {SearchListComponent} from '../search-list/search-list.component';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.styl']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;
  currentId: string;
  @Input() placeHolderText: string;
  @Input() descriptionField: string;
  @Input() keyField: string;
  @Input() get selectedId() {
    return this.currentId;
  }
  set selectedId(val) {
    this.currentId = val;
    this.selectedIdChange.emit(this.currentId);
  }
  @Input() dataService: ServiceForListInterface;
  @Output() selectedIdChange = new EventEmitter<string>();
  selectedItemDescription: string;
  constructor(
    private resolver: ComponentFactoryResolver
  ) { }
  ngOnInit() {
    this.showSelectionDescription();
  }
  ngOnDestroy() {
    if (this.componentRef != null) {
      this.componentRef.destroy();
    }
  }
  onClick() {
    this.createComponent();
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
    this.selectedId = selectedId;
    this.selectedIdChange.emit(selectedId);
    this.destroyComponent();
    this.showSelectionDescription();
  };

  private showSelectionDescription() {
    if (this.selectedId != null) {
      this.dataService
        .getDescriptionById(this.selectedId)
        .then(description => this.selectedItemDescription = description);
    }
    else {
      this.selectedItemDescription = '';
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
