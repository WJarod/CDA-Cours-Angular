import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  writeBlacklisted: boolean = false;

  blacklistedOffers: number = 0;

  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      this.offers = observableOffer;
      this.checkBlacklisted(this.offers);
    },
    errormessage => console.log(errormessage));
  }

  checkBlacklisted(offers: Offer[]): void {
    this.blacklistedOffers = 0;
    offers.forEach(offer => { 
      if (offer.isBlacklisted) {
        this.blacklistedOffers++;
      }
    })
  }

}
