
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
//import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    console.log("here");
    return this.http.get<any>('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        console.log(res)
        return res;
      })
    );
  }

getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  getSingleProduct(id:number) {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`).pipe(
      map((res: any) => {
        console.log(res)
        return res;
      })
    );
  }

}