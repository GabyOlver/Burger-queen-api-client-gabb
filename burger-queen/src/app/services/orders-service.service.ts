import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/orderInterface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  private url: string = 'https://burger-queen-api-mock-production-7cd5.up.railway.app';
  private ordersUrl = this.url + '/orders'

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService) { }

  // private getHeaders(): HttpHeaders {
  //   const token = this.storage.getToken();
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + token
  //   })
  // }

  enviarOrden(order: Order): Observable<any> {
    // const headers = this.getHeaders();
    return this.http.post(this.ordersUrl, order)
  }

  getOrderById(orderId: number): Observable<Order> {
    // const headers = this.getHeaders();
    return this.http.get<Order>(`${this.ordersUrl}/${orderId}`)
  }

  getPendingOrders(): Observable<Order[]> {
    // const headers = this.getHeaders();
    return this.http.get<Order[]>(this.ordersUrl)
  }


  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    // const headers = this.getHeaders();
    const body = { status: newStatus };
    const url = `${this.ordersUrl}/${orderId}`;
    return this.http.patch(url, body)
  }

  updateOrder(order: Order): Observable<any> {
    // const headers = this.getHeaders();
    const url = `${this.ordersUrl}/${order.id}`;
    return this.http.put(url,order);
  }
}
