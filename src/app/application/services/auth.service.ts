import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments';
import { Token } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment['BASE_API_URL'] + 'authentication/';

  constructor(private http: HttpClient) {}

  public signin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.URL + 'token/', { username, password });
  }

  public logout() {
    this.unauthentificate();
  }

  public authentificate(token: string) {
    localStorage.setItem('token', token);
  }

  public unauthentificate() {
    localStorage.removeItem('token');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
