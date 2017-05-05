import {Component, EventEmitter, OnInit, Output, ChangeDetectorRef, Input} from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.styl']
})
export class SearchListComponent implements OnInit {
  searchExpression = '';
  @Input() keyField: string;
  @Input() descriptionField: string;
  @Input() dataService: ServiceForListInterface;
  @Output() selectedItemChanged = new EventEmitter();
  @Output() selectionCancelled = new EventEmitter();
  items: any[];
  constructor(private ref: ChangeDetectorRef) { }
  clickOnItem(selectedId: string): void {
    this.selectedItemChanged.emit(selectedId);
  }
  clickOnCancel(): void {
    this.selectionCancelled.emit();
  }
  ngOnInit() {
  }
  loadData() {
    this.dataService.getList().then(items => {
      this.items = items;
    });
    this.ref.markForCheck();
  }
}
