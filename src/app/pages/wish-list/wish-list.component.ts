import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { IWishList } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);

  wishListDetails: IWishList[] = []; // Initialize as an empty array

  ngOnInit(): void {
    this.getLoggedUserWishList();
  }

  getLoggedUserWishList(): void {
    this.wishListService.getLoggedUserWishList().subscribe({
      next: (response) => {
        console.log('Wish List items:', response.data);
        // Handle the wish list data as needed
        this.wishListDetails = response.data; // Assign the data to the component property
      },
      error: (error) => {
        console.log('Error fetching wish list items:', error);
      },
    });
  }

  removeSpecificWishListItem(id: string): void {
    this.wishListService.removeSpecificWishListItem(id).subscribe({
      next: (res) => {
        console.log(res);
        // Update the wish list details after removing an item
        this.wishListDetails = this.wishListDetails.filter(
          (item) => item._id !== id
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id);
  }
}
