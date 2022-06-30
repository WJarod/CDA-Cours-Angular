import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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
    // on subscribe a notre observable
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      // on peuple notre tableau avec les donner de l observable
      this.offers = observableOffer;
    },
    errormessage => console.log(errormessage));

    this.offerService.getBlackLidtOffer().subscribe(count => this.blacklistedOffers = count)
  }

  ngDocheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }

}
