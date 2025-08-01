import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  //logic on request ........

  if (localStorage.getItem('userToken') !== null) {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('wishlist')
    ) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('userToken')!,
        },
      });
    }
  }
  return next(req); //logic on response.....
};
