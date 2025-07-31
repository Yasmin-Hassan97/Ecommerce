import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  myBrands: IBrands[] = [];

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.myBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
