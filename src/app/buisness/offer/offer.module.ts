import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferPreviewComponent } from './offer-preview/offer-preview.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { BlackListFilterPipe } from './black-list-filter.pipe';
import { RouterModule } from '@angular/router';
import { OfferPipe } from '../offer.pipe';



@NgModule({
  declarations: [
    OffersListComponent,
    OfferPreviewComponent,
    OfferDetailComponent,
    BlackListFilterPipe,
    OfferPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OffersListComponent,
    OfferPreviewComponent,
    OfferDetailComponent
  ]
})
export class OfferModule { }
