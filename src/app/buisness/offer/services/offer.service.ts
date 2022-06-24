/* It's a service that manages the offers */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { ApiOffer } from '../models/apiOffer';
import { Data } from '../models/data';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  selectedOffer?: Offer;

  offers: Offer[] = [];

  /* It's creating a new BehaviorSubject object, which is a type of Subject. A Subject is an object
  that
  can emit values to its subscribers. A BehaviorSubject is a Subject that emits the last value it
  received
  to its subscribers. */
  private observableOffer = new BehaviorSubject<Offer[]>(this.offers);

  constructor(
    private httpClient: HttpClient,
  ) { 
    console.log('OfferService created');
    this.fetchDataFromApi()
  }

  fetchDataFromApi(): void {
    this.httpClient.get<Data>('https://www.arbeitnow.com/api/job-board-api')
      .subscribe(
        d => {
          d.data.forEach(o => {
            let newOffer: Offer = (
              {
                id: this.getRandomInt().toString(),
                designation: o.title,
                description: o.description,
                contract: o.job_types[0],
                salary: o.created_at.toString(),
                isApply: false,
                isFavorite: false,
                isBlacklisted: false,
              }
            )
            this.addOffer(newOffer);
          })
        }
      )
  }

  getRandomInt(): String {
    return Math.floor(Math.random() * 10000000000000000000).toString();
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

  getBlackLidtOffer(): Observable<number> {
    return this.observableOffer.asObservable()
      .pipe(
        map(offers => offers.filter(o => o.isBlacklisted)),
        map(offers => offers.length)
    );
  }

}
