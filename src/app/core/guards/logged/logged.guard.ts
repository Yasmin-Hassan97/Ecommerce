import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(ID)) {
    // Check if the platform is browser
    if (localStorage.getItem('userToken') !== null) {
      router.navigate(['/home']); // Redirect to home page if user is logged in

      return false; // User is logged in, prevent access to the route
    } else {
      return true; // User is not logged in, allow access to the route
    }
  } else {
    return false; // If not in browser, prevent access to the route
  }
};
