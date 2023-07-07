import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidepopupComponent } from './providepopup.component';

describe('ProvidepopupComponent', () => {
  let component: ProvidepopupComponent;
  let fixture: ComponentFixture<ProvidepopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidepopupComponent]
    });
    fixture = TestBed.createComponent(ProvidepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
