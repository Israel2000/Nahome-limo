import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimoBookingComponent } from './limo-booking.component';

describe('LimoBookingComponent', () => {
  let component: LimoBookingComponent;
  let fixture: ComponentFixture<LimoBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimoBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimoBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
