import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments';
import { Token } from '../types';
import { Router } from '@angular/router';
import { Role } from '../classes/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment['BASE_API_URL'] + 'authentication/';

  constructor(private http: HttpClient, private router: Router) {}

  // signin & logout
  public signin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.URL + 'token/', { username, password });
  }

  public logout() {
    this.unauthentificate();
  }

  // authentification
  public authentificate(token: Token) {
    this.setToken(token.access);
  }

  public unauthentificate() {
    this.removeToken();
  }

  // redirections
  public redirectAfterSignin() {
    this.router.navigate([environment['DEFAULT_REDIRECT_AFTER_LOGIN']]);
  }

  public redirectAfterLogout() {
    this.router.navigate([environment['DEFAULT_REDIRECT_AFTER_LOGOUT']]);
  }

  // Token
  public setToken(token: string) {
    localStorage.setItem('x-accessToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('x-accessToken');
  }

  public removeToken() {
    localStorage.removeItem('x-accessToken');
  }

  // Role
  public setRole(role?: string) {
    localStorage.setItem('role', role ?? 'user');
  }

  public getRole(): Role | null {
    return localStorage.getItem('role') as Role;
  }

  public removeRole() {
    localStorage.removeItem('role');
  }

  //
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public isUser(): boolean {
    return this.getRole() === 'user';
  }

  public isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  public isMember(): boolean {
    return this.getRole() === 'member';
  }
}
