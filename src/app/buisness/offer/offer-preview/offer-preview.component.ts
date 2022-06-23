import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {

  @Input('data') offer: Offer = {}; 

  constructor(
    private offerService: OfferService,
    private router: Router
    ){}

  ngOnInit(): void {
  }

  blacklistedUnBlacklisteOffer(): void {
    if (this.offer.isBlacklisted) {
      this.offerService.blacklistedUnBlacklisteOffer(this.offer);
    }
    else { this.offerService.blacklistedUnBlacklisteOffer(this.offer); }
  }

  favoriteUnFavoriteOffer(): void {
    console.log(this.offer);
    if (this.offer.isFavorite) {
      this.offerService.favoriteUnFavoriteOffer(this.offer);
    }
    else { this.offerService.favoriteUnFavoriteOffer(this.offer); }
  }

  selecteOffer(offer: Offer): void {
    console.log(offer);
    this.offerService.selecteOffer(offer)
    this.router.navigate(['/offer/'+ offer.id]);
  }
  
}
