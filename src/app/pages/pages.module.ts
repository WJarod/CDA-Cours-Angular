import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { OfferModule } from '../buisness/offer/offer.module';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { OfferService } from '../buisness/offer/services/offer.service';



@NgModule({
  declarations: [
    HomeComponent,
    MyOfferComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    OfferModule
  ]
})
export class PagesModule { }
