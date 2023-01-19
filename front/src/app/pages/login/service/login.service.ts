import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';
import { ApiService } from 'src/app/shared/service/api/api.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private api: ApiService, private authService: AuthService) {  }

  login(email: string, password: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('email', email);
    httpParams = httpParams.append('password', password);
    return this.api.post(RequestEndpoints.LOGIN, httpParams).pipe(
      map(async (data: any) => {
        return data;
      }),
      catchError((error) => throwError(error))
    );
  }

  logout(): Observable<any> {
    return this.api.post(RequestEndpoints.LOGOUT, null).pipe(
      map(async (data: any) => {
        return data;
      }),
      catchError((error) => throwError(error))
    );
  }
}
