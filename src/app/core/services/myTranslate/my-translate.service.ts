import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  constructor(private translateService: TranslateService) {
    //1) set default value ..

    translateService.setDefaultLang('en');

    //  2) get language from local storage ..
    let savedLang = localStorage.getItem('myLang');

    //  3)  use language ..

    if (savedLang) {
      translateService.use(savedLang);
    }

    //  4)change direction ..

    this.changeDirection();
  }

  changeDirection(): void {
    if (localStorage.getItem('myLang') == 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    } else if (localStorage.getItem('myLang') == 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }

  changeLanguage(lang: string): void {
    // save language in localstorage

    localStorage.setItem('myLang', lang);

    // use language

    this.translateService.use(lang);

    //change Direction
    this.changeDirection();
  }
}
