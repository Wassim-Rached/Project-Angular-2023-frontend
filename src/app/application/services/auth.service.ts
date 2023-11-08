import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment['BASE_API_URL'] + 'authentication/';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post(this.URL + 'token', { username, password });
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
