import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialogRef} from '@angular/material';

import {TestModule} from '../../../test.module';
import {WaitDialogComponent} from './wait-dialog.component';

class MdDialogRefMock {
}

describe('WaitDialogComponent', () => {
  let component: WaitDialogComponent;
  let fixture: ComponentFixture<WaitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock }
      ],
      declarations: [
        // WaitDialogComponent
      ]
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
