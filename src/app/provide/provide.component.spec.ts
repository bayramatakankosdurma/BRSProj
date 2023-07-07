import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideComponent } from './provide.component';

describe('ProvideComponent', () => {
  let component: ProvideComponent;
  let fixture: ComponentFixture<ProvideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvideComponent]
    });
    fixture = TestBed.createComponent(ProvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
