import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse} from '@angular/common/http';
import { firstValueFrom, map, Observable, skipWhile } from 'rxjs';
import { TokensService } from '../auth/services/tokens.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokensService: TokensService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    if (request.url.split('/')[2] === 'api.emploi-store.fr') 
    {
      this.getToken().then(token =>{ 
        const r = request.clone({
        setHeaders : {
          'Authorization': 'Bearer ' + token
        }})
          next.handle(r).pipe(
            skipWhile(event=> event.type !== HttpEventType.Response),
            map(r=> r as HttpResponse<any>),
            map(res => res.status)
          ).subscribe(status => console.log('api.emploi-store.fr // token : ' + token))
      
          return next.handle(r);
        ;});
    }
    
    return next.handle(request);
  }

  async getToken(): Promise<string> {
    return firstValueFrom(this.tokensService.getToken());
  }
}
