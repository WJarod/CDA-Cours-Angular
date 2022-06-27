import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Data } from 'src/app/buisness/offer/models/data';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  private token = new BehaviorSubject<string>('')

  constructor(
    private httpClient: HttpClient,
  ) 
  {
    // je recupere le token de mon localStorage
    const token = localStorage.getItem('token')
    if (token === null)
    {
      // si je n est pas de token je le recup un sur mon api
      this.httpClient.get<string>('http://localhost:3000').subscribe((tkn : any) => {
        // j'envoi le token recpu dans mon behavior subject et dans mon localStorage
        localStorage.setItem('token', tkn.access_token)
        this.setToken(tkn.access_token)
      }
      )
    }
    else if (token !== null){
      // j'envoi le token de mon localStorage dans mon behavior subject
      this.setToken(token)
    }
  }

  getToken(): Observable<string> {
    return this.token.asObservable();
  }

  setToken(token: string): Observable<string> {
    this.token.next(token);
    return this.token.asObservable();
  }
}
