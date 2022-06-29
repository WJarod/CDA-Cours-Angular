import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
import { firstValueFrom, map, Observable, skipWhile } from 'rxjs';
import {tap} from 'rxjs/operators';
import { TokensService } from '../auth/services/tokens.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokensService: TokensService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /* The above code is intercepting the request and checking if the response is a 401 error. If it
    is, it will call the getTokenFromAPI() method in the tokensService. */
    //permet d intercepter la request 
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        // si la response a un code erreur 401 je set un nouveau token
        this.tokensService.getTokenFromAPI();
        this.router.navigate(['home']);
        console.log('TokenInterceptor: 401 error');
      }
    }));
  }
}
