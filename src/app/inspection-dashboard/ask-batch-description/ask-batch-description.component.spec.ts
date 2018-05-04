import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskBatchDescriptionComponent } from './ask-batch-description.component';

describe('AskBatchDescriptionComponent', () => {
  let component: AskBatchDescriptionComponent;
  let fixture: ComponentFixture<AskBatchDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskBatchDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskBatchDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
