import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { Data } from 'src/app/buisness/offer/models/data';

@Injectable({
  providedIn: 'root'
})
export class TokensService {

  private token = new BehaviorSubject<string>('')

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) 
  {
    // je recupere le token de mon localStorage
    const token = localStorage.getItem('token')
    if (token === null)
    {
      this.setTokenFromApi()
    }
    else if (token !== null){
      // j'envoi le token de mon localStorage dans mon behavior subject
      this.setToken(token)
    }
  }
  
  async setTokenFromApi(): Promise<void> {
    await this.apiService.getToken().then((tkn : any) => {
      localStorage.setItem('token', tkn.access_token)
      this.setToken(tkn.access_token)
    }
    ).catch(err => {
      console.log(err)
    })
  }

  getToken(): Observable<string> {
    return this.token.asObservable();
  }

  setToken(token: string): Observable<string> {
    this.token.next(token);
    return this.token.asObservable();
  }
}
