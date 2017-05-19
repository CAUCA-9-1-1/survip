import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialog} from '@angular/material';

import {TestModule} from '../../../test.module';
import {WaitDialogComponent} from './wait-dialog.component';

describe('WaitDialogComponent', () => {
  let component: WaitDialogComponent;
  // let fixture: ComponentFixture<WaitDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        // WaitDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(WaitDialogComponent);
    component = dialogRef.componentInstance;
    // fixture = TestBed.createComponent(WaitDialogComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
