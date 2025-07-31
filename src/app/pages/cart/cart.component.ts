import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log('Cart items:', response.data);
        this.cartDetails = response.data;
      },
      error: (error) => {
        console.log('Error fetching cart items:', error);
      },
    });
  }

  removeSpecificCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        // this.cartService.cartItemsNumber.next(res.numOfCartItems)===> behavior subject type

        this.cartService.cartItemsNumber.set(res.numOfCartItems); //===> signal type
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(quantity: any, id: string): void {
    this.cartService.updateCartProductQuantity(quantity, id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = {} as ICart;
        // this.cartService.cartItemsNumber.next(0);==> behavior subject type
        this.cartService.cartItemsNumber.set(0); //===> signal type
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
