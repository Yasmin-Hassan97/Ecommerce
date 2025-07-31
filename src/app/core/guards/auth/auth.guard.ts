import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(ID)) {
    if (localStorage.getItem('userToken') !== null) {
      return true;
    } else {
      router.navigate(['/login']);
      // Redirect to login page if userToken is not found

      //or u can use the window.location.href
      // window.location.href = '/login'; but this will reload the page
      return false;
    }
  } else {
    return false; // If not in browser, prevent access to the route
  }
};
