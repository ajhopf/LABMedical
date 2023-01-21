import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientRecordsComponent } from './pacient-records.component';

describe('PacientRecordsComponent', () => {
  let component: PacientRecordsComponent;
  let fixture: ComponentFixture<PacientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
