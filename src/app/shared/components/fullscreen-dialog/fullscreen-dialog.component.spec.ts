import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TestModule} from '../../../test.module';
import {FullscreenDialogComponent} from './fullscreen-dialog.component';

describe('CloseDialogComponent', () => {
  let component: FullscreenDialogComponent;
  let fixture: ComponentFixture<FullscreenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
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
