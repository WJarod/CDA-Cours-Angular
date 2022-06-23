import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplyOffersComponent } from './my-apply-offers.component';

describe('MyApplyOffersComponent', () => {
  let component: MyApplyOffersComponent;
  let fixture: ComponentFixture<MyApplyOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApplyOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyApplyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
