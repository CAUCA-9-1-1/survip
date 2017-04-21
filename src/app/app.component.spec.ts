import { TestBed, async } from '@angular/core/testing';

import { IgoModule } from 'igo2';

import { SharedModule } from './shared/shared.module';
import { FormModule } from './form/form.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IgoModule.forRoot(),

        SharedModule,
        FormModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
