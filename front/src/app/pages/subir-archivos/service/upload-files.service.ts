import { ApiService } from './../../../shared/service/api/api.service';
import { Injectable } from '@angular/core';
import { AsyncSubject, catchError, map, Observable, ReplaySubject, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestEndpoints } from 'src/app/shared/config/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(
    private api: ApiService,
  ) { }

  uploadFiles(arrayFiles: Array<any>): Observable<any>{
    let httpParams = new HttpParams();
    
    console.log('Array files', arrayFiles);
    httpParams = httpParams.append('files',JSON.stringify(arrayFiles))
    return this.api.post(RequestEndpoints.INVOICES_UPLOAD, httpParams).pipe(
      map(async (data: any) => { return data;
    }),catchError(error => throwError(error)));
  }

}
