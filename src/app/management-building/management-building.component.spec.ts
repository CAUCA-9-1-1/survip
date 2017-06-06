import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../test.module';
import {ManagementBuildingComponent} from './management-building.component';
import {ListComponent} from './list/list.component';

describe('ManagementBuildingComponent', () => {
  let component: ManagementBuildingComponent;
  let fixture: ComponentFixture<ManagementBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ],
      declarations: [
        ManagementBuildingComponent,
        ListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
