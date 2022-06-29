import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { Data } from 'src/app/buisness/offer/models/data';
import local from 'src/app/data/local';

@Injectable({
  providedIn: 'root'
})
export class TokensService extends local<string>{

  private token = new BehaviorSubject<string>('')

  private API_URL_TOKEN = 'http://localhost:3000'
  
  constructor(
    private httpClient: HttpClient,
  ) 
  {
    super();
    // je recupere le token de mon localStorage
    const token = localStorage.getItem('token')
    if (token === null)
    {
      // si je n est pas de token je le recup un sur mon api
      this.getTokenFromAPI()
    }
    else if (token !== null){
      // j'envoi le token de mon localStorage dans mon behavior subject
      this.setToken(token)
    }
  }

  //get token de l api
  async getTokenFromAPI(): Promise<void> {
    console.log('getToken')
    this.httpClient.get<string>('http://localhost:3000').subscribe((tkn : any) => {
        // j'envoi le token recu dans mon behavior subject et dans mon localStorage
        this.addData(tkn.access_token, 'token')
        this.setToken(tkn.access_token)
      }
      )
  }

  getToken(): Observable<string> {
    return this.token.asObservable();
  }

  setToken(token: string): Observable<string> {
    this.token.next(token);
    return this.token.asObservable();
  }
}
