import {
  Component,
  computed,
  input,
  OnInit,
  WritableSignal,
  signal,
  Signal,
} from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(
    private FlowbiteService: FlowbiteService,
    private authService: AuthService,
    private myTranslateService: MyTranslateService,
    private translateService: TranslateService,
    private cartService: CartService
  ) {}

  numberOfCartItems: Signal<number> = computed(() =>
    this.cartService.cartItemsNumber()
  );

  // @input() isLoggedIn: boolean = true;
  // new syntax for input
  isLoggedIn = input<boolean>(true);

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // this.numberOfCartItems = this.cartService.cartItemsNumber;

    // this.cartService.cartItemsNumber.subscribe({
    //   next: (value) => {
    //     this.numberOfCartItems = value;
    //   },
    // });

    if (localStorage.getItem('userToken')) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.cartItemsNumber.set(res.numOfCartItems);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  changeLang(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
  }

  currentLang(lang: string) {
    return this.translateService.currentLang == lang;
  }

  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    const navbar = document.getElementById('navbar-default');
    if (navbar) {
      if (this.isNavbarOpen) {
        navbar.classList.remove('hidden');
      } else {
        navbar.classList.add('hidden');
      }
    }
  }
}
