import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { OfferModule } from '../buisness/offer/offer.module';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { OfferService } from '../buisness/offer/services/offer.service';
import { MyFavOffersComponent } from './my-fav-offers/my-fav-offers.component';
import { MyApplyOffersComponent } from './my-apply-offers/my-apply-offers.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    MyOfferComponent,
    MyFavOffersComponent,
    MyApplyOffersComponent,
    CreateOfferComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    OfferModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
