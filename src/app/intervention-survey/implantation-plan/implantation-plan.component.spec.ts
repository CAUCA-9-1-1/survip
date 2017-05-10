import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestModule} from '../../test.module';
import {ImplantationPlanComponent} from './implantation-plan.component';
import {PictureService} from '../../shared/services/picture.service';

describe('ImplantationPlanComponent', () => {
  let component: ImplantationPlanComponent;
  let fixture: ComponentFixture<ImplantationPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [ImplantationPlanComponent],
      providers: [PictureService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplantationPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
