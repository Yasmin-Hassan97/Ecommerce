import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) {}

  AddProductToWishList(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  addProductToWishList(id: string): void {
    this.AddProductToWishList(id).subscribe({
      next: (response) => {
        console.log('Product added to wishlist:', response);
        this.toastrService.success(response.message, 'freshCart');
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
      },
    });
  }

  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }

  removeSpecificWishListItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`
    );
  }
}
