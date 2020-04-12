import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

let apiUrl = "http://localhost:8000/api/v1/";  //LOCAL

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Postlogin(data, type): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept' : 'application/json',
      })
    };
    return this.http.post<any>(apiUrl+type, data, httpOptions)
      .pipe(
    
      );
  }
}
