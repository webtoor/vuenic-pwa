import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, interval } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

let apiUrl = "http://localhost:8000/api/v1/";  //LOCAL

@Injectable({
  providedIn: 'root'
})
export class DeviceSensorService {

  constructor(private http:HttpClient) { 
  }

  getDeviceSensor(type): Observable<any> {
    return this.http.get<any>(apiUrl+type)
    .pipe(
      tap(_ => this.log('get-device-sensor')),
      catchError(this.handleError('get-device-sensor', []))
    );
  }

  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
