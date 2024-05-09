import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient, private router: Router) {}

  // ============== LocalStorage ==============
  //SET
  setElementInLocalstorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }
  //GET
  getElementInLocalstorage(key: string) {
    const element = localStorage.getItem(key);
    if (element) return JSON.parse(element);
  }
  // ============== Router ==============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  // ============== api ==============

  getApiData(urlApi: string): Observable<any> {
    return this.http.get<any>(urlApi);
  }
}
