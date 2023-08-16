import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, MenuItem, Product } from '../interfaces/menuInterface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private url:string = 'https://burger-queen-api-mock-production-7cd5.up.railway.app';
  private productsUrl = this.url + '/products';

  constructor(private http: HttpClient,
    private storage: LocalStorageService) { }

  getAllProducts():Observable<any> {
    // const headers = this.getHeaders();
    return this.http.get<MenuItem[]>(this.productsUrl)
  }

  addProduct(newProduct: CreateProduct): Observable<CreateProduct> {
    // const headers = this.getHeaders();
    return this.http.post<CreateProduct>(this.productsUrl, newProduct)
  }

  updateProduct(updatedProduct: Product): Observable<Product> {
    const url = `${this.productsUrl}/${updatedProduct.id}`;
    // const headers = this.getHeaders();
    return this.http.patch<Product>(url, updatedProduct)

  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.delete<void>(url)
  }
}
