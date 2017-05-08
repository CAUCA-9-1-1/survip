import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../test.module';
import { DxDataGridModule } from 'devextreme-angular';
import { ManagementSurveyComponent } from './management-survey.component';

describe('ManagementSurveyComponent', () => {
  let component: ManagementSurveyComponent;
  let fixture: ComponentFixture<ManagementSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule, DxDataGridModule ],
      declarations: [ ManagementSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
