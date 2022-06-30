/* It's a service that manages the offers */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import local from 'src/app/data/local';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends local<Offer>{

  selectedOffer?: Offer;

  offers: Offer[] = [];

  // on creer un beavior subject typer avec une list d offre et on assigne une liste vide
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
      this.setDataList(offers, 'offres');
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
    // on get les donner de l api
    this.setObversableOffers()
    // on retourne un observable
    return this.observableOffers.asObservable();
  }

  getObservableOffer(id: string): Observable<Offer | undefined> {
    return this.observableOffers.asObservable()
      .pipe(
        // j utilise un pipe pour ensuite map pour recuperer une offre a partir d'un id
        map(offers => offers.find(offer => offer.id === id))
      );
  }

  getSubjectOffer(): Subject<Offer[]> {
    return this.observableOffers;
  }

  addOffer(offer: Offer): void {
    // on push notre data dans notre beavior subject
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
    let favoritesOffer: Offer[] = [];
    let unFavoriteOffer: Offer[] = [];
    this.getFavoriteOffer(true).subscribe(offers => {
      favoritesOffer = offers;
    })
    this.getFavoriteOffer(false).subscribe(offers => {
      unFavoriteOffer = offers;
    })
      this.observableOffers.getValue().find(o => {

        if (offer.id === o.id) {
          o.isFavorite = !o.isFavorite;
          console.log(o)
          if (o.isFavorite === false) {
            this.deleteDataInList(unFavoriteOffer, o, 'favorites');
          }else {
            this.addDataList(favoritesOffer, o, 'favorites');
          }
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
        // on utilise un pipe pour ensuite map pour recuperer les offre qui sont black listed
        map(offers => offers.filter(o => o.isBlacklisted)),
        // on utilise le map pour return seleument le nombre d offre black listed
        map(offers => offers.length)
    );
  }

  getFavoriteOffer(isFavorite: boolean): Observable<Offer[]> {
    if (isFavorite === true) {
      return this.observableOffers.asObservable()
        .pipe(
          map(offers => offers.filter(o => o.isFavorite))
        );
    }else
    {
    return this.observableOffers.asObservable()
      .pipe(
        map(offers => offers.filter(o => o.isFavorite))
    );}}

}
