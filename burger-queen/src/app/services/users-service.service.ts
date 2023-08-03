import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateWorker, Worker } from '../interfaces/workers-interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private url:string = 'http://localhost:8080';
  private userUrl:string = this.url + '/users'

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService) { }

    private getHeaders(): HttpHeaders {
      const token = this.storage.getToken();
      return new HttpHeaders ({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    }

  getWorkers(): Observable<Worker[]>{
    const headers = this.getHeaders();
    return this.http.get<Worker[]>(this.userUrl, {headers});
  }

  addWorker(newWorker: CreateWorker): Observable<CreateWorker> {
    const headers = this.getHeaders();
    return this.http.post<CreateWorker>(this.userUrl, newWorker, { headers });
  }

  editWorker(editedWorker: Worker): Observable<Worker> {
    const headers = this.getHeaders();
    const url = `${this.userUrl}/${editedWorker.id}`;
    return this.http.put<Worker>(url, editedWorker, {headers})
  }

  deleteWorker(){}

}
