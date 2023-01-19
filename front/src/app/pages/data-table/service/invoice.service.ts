import { ApiService } from './../../../shared/service/api/api.service';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private api: ApiService,
  ) { }

  getAllInvoices(): Observable<any>{
    let httpParams = new HttpParams();
    return this.api.get(RequestEndpoints.INVOICES, httpParams).pipe(
      map(async (data: any) => {
        return data;
    }),catchError(error => throwError(error)));
  }

  editInvoice(item: any): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("item", JSON.stringify(item));
    return this.api.post(RequestEndpoints.INVOICE, httpParams).pipe(
      map(async (data: any) => {
        return data;
    }),catchError(error => throwError(error)));
  }

  getPdf(name: string): Observable<any> {
    let httpParams = new HttpParams();
    // console.log(filters);
    httpParams = httpParams.append('file', name); 
    return this.api.getFile(RequestEndpoints.INVOICE_DOWNLOAD, httpParams).pipe(
      map(async (item: any) => item),
      catchError(error => throwError(error)))
  }

}
