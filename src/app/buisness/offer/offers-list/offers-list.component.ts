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

  offers: Offer[] = this.offerService.getOffers();

  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.writeDatas();
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      this.offers = observableOffer;
      this.checkBlacklisted(this.offers);
      this.writeDatas();
    },
    errormessage => console.log(errormessage));
  }

  writeDatas(): void {
    console.log(this.offers);
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
