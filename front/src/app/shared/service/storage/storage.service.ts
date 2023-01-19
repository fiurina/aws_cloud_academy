import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clearObjectData(key: string): void{
    localStorage.removeItem(key)
  }

  setObject(key: string, data: Object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getObject(key: string): any {
    let data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return data;
  }
}
