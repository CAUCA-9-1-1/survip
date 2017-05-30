import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { DxDataGridModule } from 'devextreme-angular';
import { ManagementAccessComponent } from './management-access.component';

describe('ManagementAccessComponent', () => {
  let component: ManagementAccessComponent;
  let fixture: ComponentFixture<ManagementAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, DxDataGridModule ],
      declarations: [
        ManagementAccessComponent
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
