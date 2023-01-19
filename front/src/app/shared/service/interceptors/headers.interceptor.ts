import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  interceptorLoader: any;

  constructor(
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    if (!req.url.split('/').includes('randomurl')) {
      headers = headers.append('Content-Type', req.method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded');
    }
    if (req.urlWithParams.indexOf('login') === -1) headers = headers.append('Authorization', 'Bearer ' + this.authService.getUserData().tokenJWT);
    const authReq = req.clone({ withCredentials: true, headers})

    return this.handleRequest(next, authReq);
  }

  handleRequest(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => event));
  }
}
