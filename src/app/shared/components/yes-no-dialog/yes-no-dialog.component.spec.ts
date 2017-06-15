import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialogRef} from '@angular/material';

import {YesNoDialogComponent} from './yes-no-dialog.component';
import {TestModule} from '../../../test.module';

class MdDialogRefMock {
}

describe('YesNoDialogComponent', () => {
  let component: YesNoDialogComponent;
  let fixture: ComponentFixture<YesNoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock }
      ],
      declarations: [
        // YesNoDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
