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
    this.offerService.blacklistedUnBlacklisteOffer(this.offer);
  }

  favoriteUnFavoriteOffer(): void {
    this.offerService.favoriteUnFavoriteOffer(this.offer);
  }

  applyOffer(): void {
    this.openCloseModal();
    this.offerService.applyOffer(this.offer);
  }

  openCloseModal(): void {
    this.offerService.openOffer(this.offer);
  }

  selecteOffer(offer: Offer): void {
    this.offerService.selecteOffer(offer)
    this.router.navigate(['/offer/'+ offer.id]);
  }
  
}
