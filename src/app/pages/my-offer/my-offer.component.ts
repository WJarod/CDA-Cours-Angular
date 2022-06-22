import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/buisness/offer/models/offer';
import { OffersListComponent } from 'src/app/buisness/offer/offers-list/offers-list.component';
import { OfferService } from 'src/app/buisness/offer/services/offer.service';

@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.scss']
})
export class MyOfferComponent implements OnInit {

  offer?: Offer = this.offerService.selectedOffer;

  constructor(
    private offerService: OfferService,
  )
  { 

  }

  ngOnInit(): void {
    console.log(this.offer);
  }

}
