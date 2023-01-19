import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService) { }

  initLanguage() {
    this.changeLanguage('es');
  }

  changeLanguage(language: string) {
    // console.log('Language used: ' + language);
    this.translate.use(language);
    this.translate.setDefaultLang(language);
  }
}
