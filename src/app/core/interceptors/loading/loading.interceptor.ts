import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // logic on request...

  const ngxSpinnerService = inject(NgxSpinnerService);
  ngxSpinnerService.show();

  return next(req).pipe(
    finalize(() => {
      ngxSpinnerService.hide();
    })
  ); //logic on response...
};
