import {Component, EventEmitter, OnInit, Output, ChangeDetectorRef, Input} from '@angular/core';
import {LaneService} from '../../intervention-survey/shared/services/lane.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.styl']
})
export class SearchListComponent implements OnInit {
  searchExpression = '';
  @Input() keyField: string;
  @Input() descriptionField: string;
  @Input() dataService: LaneService;
  @Output() selectedItemChanged = new EventEmitter();
  items: any[];
  constructor(private ref: ChangeDetectorRef) { }
  clickOnItem(selectedId: string): void {
    console.log('selection');
    console.log(selectedId);
    this.selectedItemChanged.emit(selectedId);
  }
  ngOnInit() {
    this.dataService.getList().then(items => {
      this.items = items;
    });
    this.ref.markForCheck();
  }
}
