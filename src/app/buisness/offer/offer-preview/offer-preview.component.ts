import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
export class OfferPreviewComponent implements OnInit {

  @Input('data') offer: Offer = {}; 
  @Output('blacklist') blacklistEmitter = new EventEmitter<string>();
  @Output('unBlacklist') unBlacklistEmitter = new EventEmitter<string>();

  constructor() 
  {
    this.blacklistEmitter.subscribe(() => {
      console.log('blacklist');
      console.log(this.offer);
    }
    );
  }

  ngOnInit(): void {
  }

  onChange(){
    this.blacklistEmitter.emit(this.offer.id);
  }

  blacklistedOffer(): void {
    this.offer.isBlacklisted = true;
    this.blacklistEmitter.emit(this.offer.id);
  }

  unBlacklistedOffer(): void {
    this.offer.isBlacklisted = false;
    this.unBlacklistEmitter.emit(this.offer.id);
  }
  
}
