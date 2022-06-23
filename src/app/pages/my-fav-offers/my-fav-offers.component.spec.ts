import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavOffersComponent } from './my-fav-offers.component';

describe('MyFavOffersComponent', () => {
  let component: MyFavOffersComponent;
  let fixture: ComponentFixture<MyFavOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFavOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFavOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
