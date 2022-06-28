import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { TokensService } from '../auth/services/tokens.service';
import { Offer } from '../buisness/offer/models/offer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search'
  private API_URL_TOKEN = 'http://localhost:3000'

  constructor(
    private httpClient: HttpClient,
    private tokensService: TokensService,
  ) { }

  async getData(): Promise<Offer[]> 
  {
    const token = await firstValueFrom(this.tokensService.getToken());

    return firstValueFrom(this.httpClient.get<Offer[]>(this.API_URL, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    })
      .pipe(
        map((data: any) => {
          let list = [] as Offer[];
          data.resultats.forEach((o: any) => {
            list.push({
              id: o.id,
              designation: o.intitule,
              description: o.description,
              contract: o.typeContrat,
              salary: o.salaire.libelle,
              isApply: false,
              isFavorite: false,
              isBlacklisted: false,
              isOpen: false,
            } as Offer)
          })
          return list;
        })
      ));
  }

  // get token
  async getToken(): Promise<string> {
    console.log('getToken')
    return await firstValueFrom(this.httpClient.get<string>(this.API_URL_TOKEN)
    .pipe(
      map((data: any) => {
        return data.access_token;
      })));
  }
}
