import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsListingComponent } from './records-listing.component';

describe('RecordsListingComponent', () => {
  let component: RecordsListingComponent;
  let fixture: ComponentFixture<RecordsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
