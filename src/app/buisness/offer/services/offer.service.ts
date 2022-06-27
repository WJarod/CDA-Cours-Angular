/* It's a service that manages the offers */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, map, Observable, Subject } from 'rxjs';
import { TokensService } from 'src/app/auth/services/tokens.service';
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
  private observableOffers = new BehaviorSubject<Offer[]>(this.offers);
  
  private API_URL = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search'

  constructor(
    private httpClient: HttpClient,
    private tokensService: TokensService,
  ) { 
    console.log('OfferService created');
    // j appel ma methode dans le constructeur pour recup les offres au lancement de mon app 
    this.fetchDataFromApi()
  } 

  // Cette methode permet de recuperer les offres de l'api de pole emploi
  fetchDataFromApi(): void {

    // je souscris a getToken() du token service 
    this.tokensService.getToken().subscribe(token => {
      // je verifie que mon token n est pas nul
      if (token !== '') {
        // je recupere les données de l'api
        this.httpClient.get<Offer[]>(this.API_URL,
          // j ajoute un headers avec mon token
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .subscribe(
          (e : any) => {
            // je boucle les données
            e.resultats.forEach((o : any) => {
              // je créé un nouvel objet offer
              let newOffer: Offer = (
                {
                  id: o.id,
                  designation: o.intitule,
                  description: o.description,
                  contract: o.typeContrat,
                  salary: o.salaire.libelle,
                  isApply: false,
                  isFavorite: false,
                  isBlacklisted: false,
                  isOpen: false,
                }
              )
              // je l'ajoute à ma liste de mon BehaviorSubject 
              this.addOffer(newOffer);
            })
          }
        )
      }
     })

  }

  getRandomInt(): String {
    return Math.floor(Math.random() * 10000000000000000000).toString();
  }

  getObservableOffers(): Observable<Offer[]> {
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

  updateOffer(offer: Offer[]): void {
    this.getSubjectOffer().next(offer);
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
