import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../shared/interfaces/pagination.interface';
import type { Cart } from '../shared/interfaces/cart.interface';
import { GetAllCartsQuery } from '../shared/interfaces/carts-query.interface';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly appService: AppService = inject(AppService);
  private readonly endpoint: string = `${this.appService.apiUrl}`;

  cartsCreate(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.endpoint}/carts`, cart).pipe(take(1));
  }

  cartsList(query: GetAllCartsQuery): Observable<Pagination<Cart>> {
    return this.http.get<Pagination<Cart>>(`${this.endpoint}/carts`, {
      params: {
        _page: query._page,
        _size: query._size,
      }
    }).pipe(take(1))
  }

  cartsUpdate(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.endpoint}/carts/${id}`, cart).pipe(take(1));
  }

  cartsListOne(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.endpoint}/carts/${id}`).pipe(take(1));
  }

  deleteCart(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.endpoint}/carts/${id}`).pipe(take(1));
  }
}
