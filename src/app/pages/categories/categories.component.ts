import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  myCategories: ICategory[] = [];

  ngOnInit(): void {
    this.callCategories();
  }

  callCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.myCategories = response.data;
      },
    });
  }
}
