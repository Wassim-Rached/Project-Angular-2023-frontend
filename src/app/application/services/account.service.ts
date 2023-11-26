import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JoinUs, Status } from '../classes/join-us';
import { Account } from '../classes/account';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly URL = environment['BASE_API_URL'] + 'accounts/';

  constructor(private http: HttpClient) {}

  // account management
  public createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.URL, account);
  }

  public updateAccount(
    accountId: string,
    account: Account
  ): Observable<Account> {
    return this.http.patch<Account>(this.URL + accountId + '/', account);
  }

  public getAccountById(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.URL + accountId);
  }

  public getMyAccount(): Observable<Account> {
    return this.http.get<Account>(this.URL + 'me');
  }

  public deleteAccountById(accountId: string) {
    return this.http.delete(this.URL + accountId);
  }

  public changePassword(
    accountId: string,
    old_password: string,
    new_password: string
  ): Observable<string> {
    return this.http.post<string>(this.URL + accountId + '/change_password/', {
      old_password,
      new_password,
    });
  }

  // joining form management
  public getAllJoiningForms(params?: HttpParams): Observable<JoinUs[]> {
    return this.http.get<JoinUs[]>(this.URL + 'join_us/', { params });
  }

  public joinClub(joinUs: JoinUs): Observable<JoinUs> {
    return this.http.post<JoinUs>(this.URL + 'join_us/', joinUs);
  }

  public deleteJoiningForm(joinUsId: string) {
    return this.http.delete(this.URL + joinUsId);
  }

  public acceptJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'join_us/' + joinUsId + '/accept/',
      {}
    );
  }

  public rejectJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'join_us/' + joinUsId + '/reject/',
      {}
    );
  }

  public getJoiningFormById(joinUsId: string): Observable<JoinUs> {
    return this.http.get<JoinUs>(this.URL + 'join_us/' + joinUsId);
  }
}
