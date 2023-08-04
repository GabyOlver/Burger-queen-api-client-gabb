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

  private url:string = 'http://localhost:8080';
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

  addWorker(newWorker: CreateWorker): Observable<CreateWorker> {
    return this.http.post<CreateWorker>(this.userUrl, newWorker);
  }

  updateWorker(updatedWorker: Worker): Observable<Worker> {
    const url = `${this.userUrl}/${updatedWorker.id}`;
    return this.http.put<Worker>(url, updatedWorker);
  }

  deleteWorker(workerId: number): Observable<void> {
    const url = `${this.userUrl}/${workerId}`;
    return this.http.delete<void>(url)
  }

}
