import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { WishListIconComponent } from '../../shared/components/wish-list-icon/wish-list-icon.component';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
    WishListIconComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly wishListService = inject(WishListService);

  myProducts: IProduct[] = [];
  myCategories: ICategory[] = [];
  searchItem: string = '';

  mainSliderOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };

  callProducts() {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.myProducts = response.data;
      },
    });
  }

  callCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.myCategories = response.data;
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
    this.callCategories();
  }
}
