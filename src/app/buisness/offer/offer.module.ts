import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferPreviewComponent } from './offer-preview/offer-preview.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';



@NgModule({
  declarations: [
    OffersListComponent,
    OfferPreviewComponent,
    OfferDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OffersListComponent,
    OfferPreviewComponent,
    OfferDetailComponent
  ]
})
export class OfferModule { }
