import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { TIMEOUT } from '../../config/constants/api.constants';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string, params: HttpParams): Observable<any> {
    return this.http.get(url, { params: params }).pipe(
      timeout(TIMEOUT),
    );
  }

  getFile(url: string, params: HttpParams): Observable<any> {
    return this.http.get(url, { params, responseType: 'blob' }).pipe(
      timeout(TIMEOUT),
    );
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
      timeout(TIMEOUT),
    );
  }

  uploadFile(url: string, data: FormData, params?: HttpParams): Observable<any> {
    return this.http.post(url, data, {params}).pipe(
      timeout(TIMEOUT),
    );
  }

  put(url: string, body: HttpParams): Observable<any> {
    return this.http.put(url, body).pipe(
      timeout(TIMEOUT),
    );
  }

  delete(url: string, params: HttpParams): Observable<any> {
    return this.http.delete(url, { params: params }).pipe(
      timeout(TIMEOUT),
    );
  }
}
