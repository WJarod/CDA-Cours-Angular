/* It's a service that manages the offers */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import local from 'src/app/local/local';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends local<Offer>{

  selectedOffer?: Offer;

  offers: Offer[] = [];

  private observableOffers = new BehaviorSubject<Offer[]>(this.offers);

  constructor(
    private apiService: ApiService,
  ) { 
    super();
    console.log('OfferService created');
  } 

  // methode qui permet de peupler notre local storage 
  async setObversableOffers(): Promise<void> 
  {
    // utilise get data de mon api service
    await this.apiService.getData()
    /* si il ny a pas d'erreur on set les donnees recupere dans le local storage 
    avec la methode addData de notre dao
    et on update notre behavior subject */
    .then(offers => {
      this.addDataList(offers, 'offres');
      this.updateOffers(offers);
    })
    .catch(errormessage => {
      /* si il y a une erreur on utilise les donner du local storage
      et on update notre behavior subject */
      console.log(errormessage);
      const localOffer = localStorage.getItem('data');
      if (localOffer !== null) {
        this.updateOffers(JSON.parse(localOffer))
      }
     }
    );
  }

  getObservableOffers(): Observable<Offer[]> {
    this.setObversableOffers()
    return this.observableOffers.asObservable();
  }

  getObservableOffer(id: string): Observable<Offer | undefined> {
    return this.observableOffers.asObservable()
      .pipe(
        map(offers => offers.find(offer => offer.id === id))
      );
  }

  getSubjectOffer(): Subject<Offer[]> {
    return this.observableOffers;
  }

  addOffer(offer: Offer): void {
    this.observableOffers.getValue().push(offer);
    this.getSubjectOffer().next(this.observableOffers.getValue());
  }

  updateOffers(offers: Offer[]): void {
    this.updateDataList(offers, 'offres');
    this.getSubjectOffer().next(offers);
  }

  selecteOffer(offer: Offer): void { 
    this.selectedOffer = offer;
  }

  blacklistedUnBlacklisteOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (o.id === offer.id) {
        o.isBlacklisted = !o.isBlacklisted;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
    })}

  favoriteUnFavoriteOffer(offer: Offer): void {
      this.observableOffers.getValue().find(o => {
        if (offer.id === o.id) {
          o.isFavorite = !o.isFavorite;
          console.log(o)
        }
        this.observableOffers.next(this.observableOffers.getValue());
    })
  }

  applyOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (offer.id === o.id) {
        o.isApply = !o.isApply;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
  })
  }

  openOffer(offer: Offer): void {
    this.observableOffers.getValue().find(o => {
      if (offer.id === o.id) {
        o.isOpen = !o.isOpen;
        console.log(o)
      }
      this.observableOffers.next(this.observableOffers.getValue());
    })}

  getBlackLidtOffer(): Observable<number> {
    return this.observableOffers.asObservable()
      .pipe(
        map(offers => offers.filter(o => o.isBlacklisted)),
        map(offers => offers.length)
    );
  }

}
