
import { environment } from 'src/environments/environment';
import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { AppRoutes } from '../../shared/config/constants/router.constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: string = '';
  password: string = '';

  environment = environment;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  async login() {
    try {
      // let result = await lastValueFrom(this.loginService.login(this.user, this.password));
      // console.log('Login result', result);
      // let admin = new AdminUser(result.name, result.surname, result.email, result.tokenJWT);
      // this.authService.setUserData(admin);
      this.router.navigate([AppRoutes.subirArchivos]);
    } catch (error) {
      console.log(error);
    }
  }

}
