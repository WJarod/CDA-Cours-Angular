import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { MyFavOffersComponent } from './my-fav-offers/my-fav-offers.component';

const child_routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'offer/:id', component: MyOfferComponent },
  { path: 'fav-offers', component: MyFavOffersComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(child_routes)
    ]
})
export class PagesRoutingModule { }
