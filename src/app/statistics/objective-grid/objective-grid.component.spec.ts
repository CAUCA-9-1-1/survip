import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveGridComponent } from './objective-grid.component';

describe('ObjectiveGridComponent', () => {
  let component: ObjectiveGridComponent;
  let fixture: ComponentFixture<ObjectiveGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
