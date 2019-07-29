import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/users', credentials)
      .pipe(mergeMap(res => this.login(credentials)));
  }

  login(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/sessions', credentials)
      .pipe(
        map((res: any) => {
          localStorage.setItem('Authorization', res.token);
          return res;
        })
      );
  }
}
