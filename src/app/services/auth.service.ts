import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

//LOCAL
let apiUrl = "http://localhost:8080/v1/";  
//PROD
/* let apiUrl = "https://api.vuenic.com/v1/"; */  

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Postlogin(data, type): Observable<any> {
    return this.http.post<any>(apiUrl+type, data)
    .pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', []))
    );
  }

  Postsignup(data, type): Observable<any> {
    return this.http.post<any>(apiUrl+type, data)
    .pipe(
      tap(_ => this.log('signup')),
      catchError(this.handleError('signup', []))
    );
  }

  GithubPost(data): Observable<any> {
    return this.http.post<any>("https://github.com/login/oauth/access_token", data)
    .pipe(
      tap(_ => this.log('github-post')),
      catchError(this.handleError('github-post', []))
    );
  }

  GithubGet(type): Observable<any> {
    return this.http.get<any>("https://api.github.com/"+type)
    .pipe(
      tap(_ => this.log('get-github-req')),
      catchError(this.handleError('get-github-req', []))
    );
  }

  GetRequest(type): Observable<any> {
    return this.http.get<any>(apiUrl+type)
    .pipe(
      tap(_ => this.log('get-http-request')),
      catchError(this.handleError('get-http-request', []))
    );
  }

  PostRequest(data, type): Observable<any> {
    return this.http.post<any>(apiUrl+type, data)
    .pipe(
      tap(_ => this.log('post-http-request')),
      catchError(this.handleError('post-http-request', []))
    );
  }

  PutRequest(data, type): Observable<any> {
    return this.http.put<any>(apiUrl+type, data)
    .pipe(
      tap(_ => this.log('put-http-request')),
      catchError(this.handleError('put-http-request', []))
    );
  }

  deleteRequest(type): Observable<any> {
    return this.http.delete<any>(apiUrl+type)
    .pipe(
      tap(_ => this.log('delete-http-request')),
      catchError(this.handleError('delete-http-request', []))
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

  isAuthenticated(){
    return localStorage.getItem('vuenic-pwa');
  }
}
