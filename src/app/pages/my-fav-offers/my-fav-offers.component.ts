import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/buisness/offer/models/offer';
import { OfferService } from 'src/app/buisness/offer/services/offer.service';

@Component({
  selector: 'app-my-fav-offers',
  templateUrl: './my-fav-offers.component.html',
  styleUrls: ['./my-fav-offers.component.scss']
})
export class MyFavOffersComponent implements OnInit {

  offers: Offer[] = [];

  constructor(
    private offerService: OfferService,
  ) { }

  ngOnInit(): void {
    this.offerService.getObservableOffers().subscribe(observableOffer => {
      observableOffer.forEach(offer => {
        if (offer.isFavorite) {
          this.offers.push(offer);
        }
      })
    },
    errormessage => console.log(errormessage));
  }
}
