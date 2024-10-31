import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamhomeHomeComponent } from './namhome-home.component';

describe('NamhomeHomeComponent', () => {
  let component: NamhomeHomeComponent;
  let fixture: ComponentFixture<NamhomeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamhomeHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamhomeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
