import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = "https://mini-project-iset.onrender.com/api/authentication/"

  constructor(private http: HttpClient) {
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.URL + "token", { username, password })
  }
  logout() {
    this.unauthentificate()
  }
  authentificate(token: string) {
    localStorage.setItem("token", token)
  }
  unauthentificate() {
    localStorage.removeItem("token")
  }
}

