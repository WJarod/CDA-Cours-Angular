import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { TokensService } from '../auth/services/tokens.service';
import { Offer } from '../buisness/offer/models/offer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?range=0-10';

  constructor(
    private httpClient: HttpClient,
    private tokensService: TokensService,
  ) { }

  async getData(): Promise<Offer[]> 
  {
    const token = await firstValueFrom(this.tokensService.getToken());

    let newToken = token.replace('"', '')
    return firstValueFrom(this.httpClient.get<Offer[]>(this.API_URL, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + newToken.replace('"', '')
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

}
