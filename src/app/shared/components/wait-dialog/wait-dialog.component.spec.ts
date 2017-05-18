import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {WaitDialogComponent} from './wait-dialog.component';

describe('CloseDialogComponent', () => {
  let component: WaitDialogComponent;
  let fixture: ComponentFixture<WaitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});