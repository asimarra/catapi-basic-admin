import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IUserBasicData } from '../interfaces/IUsers';

const { baseApiUrl } = environment;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${baseApiUrl}/auth/signin`, {
      username,
      password
    }, httpOptions);
  }

  register(userData: IUserBasicData): Observable<any> {
    return this.http.post(`${baseApiUrl}/auth/signup`, userData, httpOptions);
  }
}
