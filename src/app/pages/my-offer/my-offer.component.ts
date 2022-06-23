import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Offer } from 'src/app/buisness/offer/models/offer';
import { OffersListComponent } from 'src/app/buisness/offer/offers-list/offers-list.component';
import { OfferService } from 'src/app/buisness/offer/services/offer.service';

@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.scss']
})
export class MyOfferComponent implements OnInit {

  offer: Offer = {};

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute
  )
  { 
    route.params.subscribe(params => {
      this.loadOffer(params['id']);
    })
  }

  ngOnInit(): void {
    console.log(this.offer);
  }

  async loadOffer(id: string): Promise<void> {
    var getOffer = await firstValueFrom(this.offerService.getObservableOffer(id))
    if (getOffer !== undefined) 
    {
      this.offer = getOffer;
    }
    console.log(this.offer)
  }
}
