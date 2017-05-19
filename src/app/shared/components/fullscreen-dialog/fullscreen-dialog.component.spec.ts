import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialog} from '@angular/material';

import {TestModule} from '../../../test.module';
import {FullscreenDialogComponent} from './fullscreen-dialog.component';

describe('FullscreenDialogComponent', () => {
  let component: FullscreenDialogComponent;
  // let fixture: ComponentFixture<FullscreenDialogComponent>;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        // FullscreenDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(FullscreenDialogComponent);
    component = dialogRef.componentInstance;
    // fixture = TestBed.createComponent(FullscreenDialogComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
