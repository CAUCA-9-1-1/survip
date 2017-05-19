import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialog} from '@angular/material';

import {YesNoDialogComponent} from './yes-no-dialog.component';
import {TestModule} from '../../../test.module';

describe('YesNoDialogComponent', () => {
  let component: YesNoDialogComponent;
  // let fixture: ComponentFixture<YesNoDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        // YesNoDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(YesNoDialogComponent);
    component = dialogRef.componentInstance;
    // fixture = TestBed.createComponent(YesNoDialogComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
