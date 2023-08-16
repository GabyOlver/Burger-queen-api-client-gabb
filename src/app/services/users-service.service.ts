import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateWorker, Worker } from '../interfaces/workers-interface';
import { LocalStorageService } from './local-storage.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private url:string = 'https://burger-queen-api-mock-production-7cd5.up.railway.app';
  private userUrl:string = this.url + '/users'

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService) { }

    // private getHeaders(): HttpHeaders {
    //   const token = this.storage.getToken();
    //   console.log('Token', token)
    //   return new HttpHeaders ({
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token
    //   })
    // }

  getWorkers(): Observable<Worker[]>{
    return this.http.get<Worker[]>(this.userUrl);
  }

  getWorker(workerId: number): Observable<any>{
    return this.http.get(`${this.userUrl}/${workerId}`)
  }

  addWorker(newWorker: CreateWorker): Observable<CreateWorker> {
    return this.http.post<CreateWorker>(this.userUrl, newWorker);
  }

  updateWorker(updatedWorker: Worker): Observable<Worker> {
    const url = `${this.userUrl}/${updatedWorker.id}`;
    return this.http.put<Worker>(url, updatedWorker);
  }

  editWorker(workerId: number, body:CreateWorker){
    return this.http.patch<Worker>(`${this.userUrl}/${workerId}`, body)
  }

  deleteWorker(workerId: number): Observable<void> {
    const url = `${this.userUrl}/${workerId}`;
    return this.http.delete<void>(url)
  }

}
