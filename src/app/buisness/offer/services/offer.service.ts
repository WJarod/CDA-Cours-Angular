import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
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

  getObservableOffers(): Observable<Offer[]> {
    return this.observableOffer.asObservable();
  }

  getObservableOffer(id: string): Observable<Offer | undefined> {
    return this.observableOffer.asObservable()
      .pipe(
        map(offers => offers.find(offer => offer.id === id))
      );
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
    this.observableOffer.getValue().find(o => {
      if (o.id === offer.id) {
        o.isBlacklisted = !o.isBlacklisted;
        console.log(o)
      }
      this.observableOffer.next(this.observableOffer.getValue());
    })}

  favoriteUnFavoriteOffer(offer: Offer): void {
      this.observableOffer.getValue().find(o => {
        if (offer.id === o.id) {
          o.isFavorite = !o.isFavorite;
          console.log(o)
        }
        this.observableOffer.next(this.observableOffer.getValue());
    })
  }

  applyOffer(offer: Offer): void {
    this.observableOffer.getValue().find(o => {
      if (offer.id === o.id) {
        o.isApply = !o.isApply;
        console.log(o)
      }
      this.observableOffer.next(this.observableOffer.getValue());
  })
  }

  openOffer(offer: Offer): void {
    this.observableOffer.getValue().find(o => {
      if (offer.id === o.id) {
        o.isOpen = !o.isOpen;
        console.log(o)
      }
      this.observableOffer.next(this.observableOffer.getValue());
    })}

}
