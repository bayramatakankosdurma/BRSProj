import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchpopupComponent } from './matchpopup.component';

describe('MatchpopupComponent', () => {
  let component: MatchpopupComponent;
  let fixture: ComponentFixture<MatchpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchpopupComponent]
    });
    fixture = TestBed.createComponent(MatchpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
