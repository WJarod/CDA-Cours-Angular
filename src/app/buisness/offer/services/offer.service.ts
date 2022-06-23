import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  selectedOffer?: Offer;

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
      isBlacklisted: true,
    },{
      id: '4',
      designation: 'Offer 4',
      description: 'Offer 4 description',
      contract: 'Offer 4 contract',
      salary: '400',
      isApply: false,
      isFavorite: false,
      isBlacklisted: false,
    },{
      id: '5',
      designation: 'Offer 5',
      description: 'Offer 5 description',
      contract: 'Offer 5 contract',
      salary: '500',
      isApply: false,
      isFavorite: false,
      isBlacklisted: false,
    }
  ];

  private observableOffer = new BehaviorSubject<Offer[]>(this.offers);

  constructor() { 
    console.log('OfferService created');
  }

  getById(id: string): Offer | undefined {
    return this.offers.find(offer => offer.id === id);
  }

  getOffers(): Offer[] {
    return this.offers;
  }

  getObservableOffers(): Observable<Offer[]> {
    return this.observableOffer.asObservable();
  }

  getSubjectOffer(): Subject<Offer[]> {
    return this.observableOffer;
  }


  addOffer(offer: Offer): void {
    this.observableOffer.getValue().push(offer);
    this.getSubjectOffer().next(this.observableOffer.getValue());
  }

  updateOffer(offer: Offer[]): void {
    this.getSubjectOffer().next(offer);
  }

  selecteOffer(offer: Offer): void { 
    this.selectedOffer = offer;
  }

  blacklistedUnBlacklisteOffer(offer: Offer): void {
    if (offer.isBlacklisted) {
      this.observableOffer.getValue().forEach(o => {
        if (offer.id === o.id) {
          offer.isBlacklisted = false;
        }
        this.observableOffer.next(this.observableOffer.getValue());
    })
    }
    else 
    { 
      this.observableOffer.getValue().forEach(o => {
        if (offer.id === o.id) {
          offer.isBlacklisted = true;
        }
        this.observableOffer.next(this.observableOffer.getValue());
    }) 
    }
  }

}
