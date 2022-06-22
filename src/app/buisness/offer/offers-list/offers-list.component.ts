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
    this.checkBlacklisted(this.offers)
  }

  writeDatas(): void {
    console.log(this.offers);
  }

  blacklistedOffer(str: string): void {
    console.log('Cette offre a ete blackliste : ' + str);
    this.checkBlacklisted(this.offers)
    this.writeDatas();
  }

  unBlacklistedOffer(str: string): void {
    console.log('Cette offre a ete unBlackliste : ' + str);
    this.checkBlacklisted(this.offers)
    this.writeDatas();
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
