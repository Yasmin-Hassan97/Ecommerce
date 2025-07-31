import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { WishListIconComponent } from '../../shared/components/wish-list-icon/wish-list-icon.component';

@Component({
  selector: 'app-details',
  imports: [WishListIconComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor() {}

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);

  prodID: any;
  prodData: IProduct | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.prodID = res.get('id');
        this.productsService.getSpecificProduct(this.prodID).subscribe({
          next: (res) => {
            this.prodData = res.data;
            console.log('Product details fetched successfully:', this.prodData);
          },
          error: (err) => {
            console.log('Error fetching product details:', err);
          },
        });
      },
    });
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id);
  }

  addProductToWishList(id: string): void {
    this.wishListService.addProductToWishList(id);
  }
}
