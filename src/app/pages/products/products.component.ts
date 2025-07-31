import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { WishListIconComponent } from '../../shared/components/wish-list-icon/wish-list-icon.component';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule, WishListIconComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  myProducts: IProduct[] = [];
  searchItem: string = '';

  callProducts() {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.myProducts = response.data;
      },
    });
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id);
  }

  addProductToWishList(id: string): void {
    this.wishListService.addProductToWishList(id);
  }

  ngOnInit(): void {
    this.callProducts();
  }
}
