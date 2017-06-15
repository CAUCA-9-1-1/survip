import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MdDialogRef} from '@angular/material';

import {TestModule} from '../../../test.module';
import {FullscreenDialogComponent} from './fullscreen-dialog.component';

class MdDialogRefMock {
}

describe('FullscreenDialogComponent', () => {
  let component: FullscreenDialogComponent;
  let fixture: ComponentFixture<FullscreenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock }
      ],
      declarations: [
        // FullscreenDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
