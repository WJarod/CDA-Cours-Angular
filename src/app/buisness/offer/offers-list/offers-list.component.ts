import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  offers: Offer[] = [
    {
      id: '1',
      designation: 'Offer 1',
      description: 'Offer 1 description',
      contract: 'Offer 1 contract',
      salary: '100',
      isApply: false,
      isFavorite: false,
      isBlacklisted: false,
    },{
      id: '2',
      designation: 'Offer 2',
      description: 'Offer 2 description',
      contract: 'Offer 2 contract',
      salary: '200',
      isApply: false,
      isFavorite: false,
      isBlacklisted: false,
    },{
      id: '3',
      designation: 'Offer 3',
      description: 'Offer 3 description',
      contract: 'Offer 3 contract',
      salary: '300',
      isApply: false,
      isFavorite: false,
      isBlacklisted: false,
    }
  ];

  writeBlacklisted: boolean = false;

  blacklistedOffers: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.writeDatas();
  }

  writeDatas(): void {
    console.log(this.offers);
  }

  blacklistedOffer(str: string): void {
    console.log('Cette offre a ete blackliste : ' + str);
    this.blacklistedOffers++;
    this.writeDatas();
  }

  unBlacklistedOffer(str: string): void {
    console.log('Cette offre a ete unBlackliste : ' + str);
    this.blacklistedOffers--;
    this.writeDatas();
  }
}
