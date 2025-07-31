import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  userToken = localStorage.getItem('userToken')!;

  checkoutSession(id: string, shippingData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        shippingAddress: shippingData,
      }
    );
  }

  createCashOrder(id: string, shippingData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`, {
      shippingAddress: shippingData,
    });
  }
}
