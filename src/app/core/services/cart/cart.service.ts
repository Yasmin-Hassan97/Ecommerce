import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private HttpClient: HttpClient,
    private toastrService: ToastrService
  ) {}

  // behaviorSubject ====> subscribe
  // cartItemsNumber:number =0
  // set value ==> .next()
  // get value ==> .subscribe()

  // cartItemsNumber: BehaviorSubject<number> = new BehaviorSubject(0);==>behavior subject type

  cartItemsNumber: WritableSignal<number> = signal(0); //====> signal type

  AddProductToCart(id: string): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  addProductToCart(id: string): void {
    this.AddProductToCart(id).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        this.toastrService.success(response.message, 'freshCart');

        // this.cartService.cartItemsNumber.next(response.numOfCartItems);==>behavior subject type

        this.cartItemsNumber.set(response.numOfCartItems); //==>signal type
      },
    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  updateCartProductQuantity(quantity: string, id: string): Observable<any> {
    return this.HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: quantity,
    });
  }

  clearCart(): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
