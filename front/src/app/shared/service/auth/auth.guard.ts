
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, estado: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let data = await lastValueFrom(this.authService.validateTokenToServer());
      console.log('Validate token server Can Activate', data)
      // this.authService.setRoles(data);
            // this.authService.setRoles([]);
      // let roles = this.authService.getRoles();
      // console.log('Roles de usuario',roles);
      // resolve(this.authService.checkRolePermission(next.data['roles'] || [], roles))
      resolve(true);
    });
  }
}
