import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    this.token.subscribe(token => {
      localStorage.setItem('token', token)
    })
    
    const token = localStorage.getItem('token')
    if (token) this.setToken(token)
    else this.httpClient.get<string>('http://localhost:3000').subscribe((tkn : any) => {
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
