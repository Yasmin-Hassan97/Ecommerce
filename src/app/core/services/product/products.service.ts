import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IProduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(cateId?: string): Observable<any> {
    let params = new HttpParams();
    if (cateId) {
      params = params.set('category[in]', cateId);
    }
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`, {
      params,
    });
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
