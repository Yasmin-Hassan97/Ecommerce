import { Component, inject, Input } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { IWishList } from '../../interfaces/iwishlist';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list-icon',
  imports: [NgClass],
  templateUrl: './wish-list-icon.component.html',
  styleUrl: './wish-list-icon.component.scss',
})
export class WishListIconComponent {
  // This component can be used to display a wish list icon
  // and handle click events to toggle the wish list status.

  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);

  @Input() productId: string = '';
  wishlistProductIds: string[] = [];

  //store the product ids in local storage
  ngOnInit(): void {
    // Check if the product ID is in local storage
    const storedWishlist = localStorage.getItem('wishlistProductIds');
    if (!storedWishlist) {
      localStorage.setItem('wishlistProductIds', JSON.stringify([]));
    }
    this.wishlistProductIds = JSON.parse(
      localStorage.getItem('wishlistProductIds') || '[]'
    );
  }
  toggleStatus(): void {
    // Logic to toggle the wish list status can be added here
    // check if id is in local storage or not
    if (!this.wishlistProductIds.includes(this.productId)) {
      this.wishlistProductIds.push(this.productId);
      localStorage.setItem(
        'wishlistProductIds',
        JSON.stringify(this.wishlistProductIds)
      );
      this.addToWishList();
    } else {
      this.wishlistProductIds = this.wishlistProductIds.filter(
        (id) => id !== this.productId
      );
      localStorage.setItem(
        'wishlistProductIds',
        JSON.stringify(this.wishlistProductIds)
      );
      this.removeSpecificWishListItem(this.productId);
    }
  }

  addToWishList(): void {
    this.wishListService.addProductToWishList(this.productId);
  }

  removeSpecificWishListItem(id: string): void {
    this.wishListService.removeSpecificWishListItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'freshCart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
