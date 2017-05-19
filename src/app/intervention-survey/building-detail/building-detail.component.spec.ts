import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {TestModule} from '../../test.module';
import {BuildingDetailComponent} from './building-detail.component';
import {PictureService} from '../../shared/services/picture.service';

describe('BuildingDetailComponent', () => {
  let component: BuildingDetailComponent;
  let fixture: ComponentFixture<BuildingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, RouterTestingModule],
      declarations: [BuildingDetailComponent],
      providers: [PictureService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
