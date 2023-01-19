import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RequestEndpoints } from '../../config/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  constructor(
    private api: ApiService,
  ) {}

  tiles = [
    {
      text: 'Recursos',
      url: '/resources',
      icon: 'search',
      roles: []
    },
    {
      text: 'Minijuegos',
      url: '/minigames',
      icon: 'search',
      roles: []
    },
    {
      text: 'Retos',
      url: '/challenges',
      icon: 'wrench',
      roles: []
    },
    {
      text: 'Recompensas',
      url: '/prizes',
      icon: 'search',
      roles: []
    },
    {
      text: 'Gestión de jugadores',
      url: '/players',
      icon: 'search',
      roles: []
    },
  ];


  uploadImageServer(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.api.uploadFile(RequestEndpoints.IMAGES_REPO, formData).pipe(
      map(async (data: any) => data),
      catchError(error => throwError(error)));
  }
}
