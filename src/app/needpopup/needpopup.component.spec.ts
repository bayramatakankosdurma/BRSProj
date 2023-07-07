import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedpopupComponent } from './needpopup.component';

describe('NeedpopupComponent', () => {
  let component: NeedpopupComponent;
  let fixture: ComponentFixture<NeedpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeedpopupComponent]
    });
    fixture = TestBed.createComponent(NeedpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
