import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/buisness/offer/models/offer';
import { OfferService } from 'src/app/buisness/offer/services/offer.service';

@Component({
  selector: 'app-my-apply-offers',
  templateUrl: './my-apply-offers.component.html',
  styleUrls: ['./my-apply-offers.component.scss']
})
export class MyApplyOffersComponent implements OnInit {

  offers: Offer[] = [];
  
  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      this.offers = observableOffer;
    },
    errormessage => console.log(errormessage));
  }

}
