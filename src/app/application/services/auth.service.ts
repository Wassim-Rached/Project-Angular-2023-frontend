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

  // signin handling
  public signin(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.URL + 'token/', { username, password });
  }

  // logout handling
  public logout() {
    this.unauthentificate();
    this.removeRole();
    this.removeAccountId();
    this.redirectAfterLogout();
  }

  // authentification handling
  public authentificate(token: Token) {
    this.setToken(token.access);
  }

  public unauthentificate() {
    this.removeAccessToken();
  }

  // redirections handling
  public redirectAfterSignin() {
    if (this.isAdmin()) {
      this.router.navigate([environment['DEFAULT_REDIRECT_AFTER_LOGIN_ADMIN']]);
    } else {
      this.router.navigate([environment['DEFAULT_REDIRECT_AFTER_LOGIN']]);
    }
  }

  public redirectAfterLogout() {
    this.router.navigate([environment['DEFAULT_REDIRECT_AFTER_LOGOUT']]);
  }

  // Token handling
  public setToken(access_token: string) {
    localStorage.setItem(environment['ACCESS_TOKEN_NAME'], access_token);
  }

  public getAcessToken(): string | null {
    return localStorage.getItem(environment['ACCESS_TOKEN_NAME']);
  }

  public removeAccessToken() {
    localStorage.removeItem(environment['ACCESS_TOKEN_NAME']);
  }

  // Role handling
  public setRole(role?: Role) {
    localStorage.setItem('role', role ?? 'user');
  }

  public getRole(): Role | null {
    return localStorage.getItem('role') as Role;
  }

  public removeRole() {
    localStorage.removeItem('role');
  }

  // AccountId handling
  public setAccountId(accountId: string) {
    localStorage.setItem('accountId', accountId);
  }

  public getAccountId(): string | null {
    return localStorage.getItem('accountId');
  }

  public removeAccountId() {
    localStorage.removeItem('accountId');
  }

  // informations about the user
  public isAuthenticated(): boolean {
    // the user is considered authenticated
    // if he has an access token on local storage
    return this.getAcessToken() !== null;
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
