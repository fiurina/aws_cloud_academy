import { StorageService } from './../storage/storage.service';
import { ApiService } from './../api/api.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestEndpoints } from '../../config/constants/api.constants';
import { catchError, map } from 'rxjs/operators';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { StorageKeys } from '../../config/constants/router.constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private storageService: StorageService,
  ) { }

  clearUserData(): void {
    this.storageService.clearObjectData(StorageKeys.USER);
  }

  // setUserData(value: AdminUser): void {
  //   this.storageService.setObject(StorageKeys.USER, value);
  // }

  getUserData(): any {
    let user = this.storageService.getObject(StorageKeys.USER);
    if (user) return user;
    else return {};
  }

  async validateToken() {
    try {
      // console.log('Validating token in headers')
      let validated = await lastValueFrom(this.validateTokenToServer());
      // console.log('Server validation.', validated)
      if (validated) {
        // console.log('Validated', validated)
        return true;
      }
      else return false;
    } catch (error) {
      return false;
    }
  }

  logoutToServer(): Observable<any> {
    let httpParams = new HttpParams();
    return this.api.post(RequestEndpoints.LOGOUT, httpParams).pipe(
      map(async (data: any) => {
        return data;
      }),
      catchError((error) => throwError(error))
    );
  }

  validateTokenToServer(): Observable<any> {
    let httpParams = new HttpParams();
    return this.api.get(RequestEndpoints.VALIDATE_TOKEN, httpParams).pipe(
      map(async (data: any) => {
        return data;
      }),
      catchError((error) => throwError(error))
    );
  }

  // checkRolePermission(data: string[], userRoles: string[]): boolean {
  //   let correctRole = false;

  //   data.forEach(permittedRole => {
  //     if (userRoles.includes(permittedRole)) { correctRole = true;}
  //   });
  //   return correctRole;
  // }
}
