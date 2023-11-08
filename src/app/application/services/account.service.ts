import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JoinUs, Status } from '../classes/join-us';
import { Observable } from 'rxjs';
import { Account } from '../classes/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly URL = "https://mini-project-iset.onrender.com/api/accounts/"

  constructor(private http: HttpClient) {
  }
  getAccountById(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.URL + accountId)
  }
  getMyAccount(): Observable<Account> {
    return this.http.get<Account>(this.URL + "me")
  }
  deleteAccountById(accountId: string) {
    return this.http.delete(this.URL + accountId)
  }
  getAllJoiningForms(): Observable<JoinUs[]> {
    return this.http.get<JoinUs[]>(this.URL + "join_us")
  }
  joinClub(joinUs: JoinUs): Observable<JoinUs> {
    return this.http.post(this.URL + "join_us", joinUs)
  }
  deleteJoiningForm(joinUsId: string) {
    return this.http.delete(this.URL + joinUsId)
  }
  acceptJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + joinUsId + "/accept", {})
  }
  rejectJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + joinUsId + "/reject", {})
  }

}
