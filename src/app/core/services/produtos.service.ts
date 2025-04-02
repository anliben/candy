import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../shared/interfaces/pagination.interface';
import { Product } from '../shared/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly appService: AppService = inject(AppService);
  private readonly endpoint: string = `${this.appService.apiUrl}`;

  productCreate(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.endpoint}/products`, product);
  }

  productList(): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(`${this.endpoint}/products`).pipe(take(1));
  }

  producCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.endpoint}/categories`).pipe(take(1));
  }

  productListCategory(category: string): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(`${this.endpoint}/products/category/${category}`).pipe(take(1));
  }

  productUpdate(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.endpoint}/products/${id}`, product).pipe(take(1));
  }

  productListOne(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.endpoint}/products/${id}`).pipe(take(1));
  }

  deleteUser(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.endpoint}/products/${id}`).pipe(take(1));
  }
}
