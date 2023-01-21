import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientRegistrationComponent } from './pacient-registration.component';

describe('PacientRegistrationComponent', () => {
  let component: PacientRegistrationComponent;
  let fixture: ComponentFixture<PacientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
