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

  public authentificate(token: Token) {
    localStorage.setItem('x-accessToken', token.access);
  }

  public unauthentificate() {
    localStorage.removeItem('x-accessToken');
  }

  public getToken(): string | null {
    return localStorage.getItem('x-accessToken');
  }
}
