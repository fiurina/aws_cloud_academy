import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorRequest } from '../../config/constants/error-request.enum';
import { AppRoutes } from '../../config/constants/router.constants';
import { Router } from '@angular/router';


@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  isLoading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,

    private authService: AuthService,
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequest(next, req);

  }

  handleRequest(next: HttpHandler, req: HttpRequest<any>): Observable<any> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) =>event),
      catchError((error: HttpErrorResponse) => this.requestErrorHandling(error))
    )
  }

  requestErrorHandling(error: HttpErrorResponse) {
    this.filterError(error)
    return throwError(error)
  }

  async filterError(error: HttpErrorResponse) {
    let s = "Error" + error.status
    let enumKeys = Object.keys(ErrorRequest).filter(x => !(parseInt(x) >= 0));
    if(enumKeys.includes(s)) status = "Default";
    console.log(error);
    this.openSnackBar(this.showMessage(error), 'Aceptar');
  }

  showMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        return 'No se ha podido conectar con el servidor';
      case 310:
        window.location.href = error.error.url;
        return 'Error de autenticación';
      case 401:
        this.authService.clearUserData();
        this.router.navigate([AppRoutes.LOGIN]);
        return 'Error de autenticación';
      case 403:
        return 'Usuario bloqueado. Contacte con administrador';
      case 500:
        return "Error en la operación del servidor";
      case 525:
        return error.error.message;
      default:
        return 'Error en el servidor';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
