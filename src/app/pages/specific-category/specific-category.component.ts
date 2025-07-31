import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { WishListIconComponent } from '../../shared/components/wish-list-icon/wish-list-icon.component';

@Component({
  selector: 'app-specific-category',
  imports: [RouterLink, WishListIconComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss',
})
export class SpecificCategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);

  catID: any;
  catName: string = '';
  myProducts: IProduct[] = [];

  ngOnInit(): void {
    this.getSpecificCategoryProducts(this.catID);
  }

  getSpecificCategoryProducts(cateId: string): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.catID = res.get('id');
        this.catName = res.get('name') || '';
        this.productsService.getProducts(this.catID).subscribe({
          next: (res) => {
            this.myProducts = res.data;
            console.log(
              'Products in specific category fetched successfully:',
              this.myProducts
            );
          },
          error: (err) => {
            console.log('Error fetching products in specific category:', err);
          },
        });
      },
    });
  }

  addProductToWishList(id: string): void {
    this.wishListService.addProductToWishList(id);
  }

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id);
  }
}
