import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments';
import { Token } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment['BASE_API_URL'] + 'authentication/';

  //
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  isAdmin = true;
  setAuthenticated() {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  setUnauthenticated() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  constructor(private http: HttpClient) {}

  public signin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.URL + 'token/', { username, password });
  }

  public logout() {
    this.unauthentificate();
  }

  public authentificate(token: Token) {
    this.setAuthenticated();
    localStorage.setItem('x-accessToken', token.access);
  }

  public unauthentificate() {
    this.setUnauthenticated();
    localStorage.removeItem('x-accessToken');
  }

  public getToken(): string | null {
    return localStorage.getItem('x-accessToken');
  }
}
