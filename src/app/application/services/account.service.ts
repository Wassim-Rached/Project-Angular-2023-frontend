import { HttpClient } from '@angular/common/http';
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

  public getAccountById(accountId: string): Observable<Account> {
    return this.http.get<Account>(this.URL + accountId);
  }

  public getMyAccount(): Observable<Account> {
    return this.http.get<Account>(this.URL + 'me');
  }

  public deleteAccountById(accountId: string) {
    return this.http.delete(this.URL + accountId);
  }

  public getAllJoiningForms(): Observable<JoinUs[]> {
    return this.http.get<JoinUs[]>(this.URL + 'join_us');
  }

  public joinClub(joinUs: JoinUs): Observable<JoinUs> {
    return this.http.post(this.URL + 'join_us', joinUs);
  }

  public deleteJoiningForm(joinUsId: string) {
    return this.http.delete(this.URL + joinUsId);
  }

  public acceptJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + joinUsId + '/accept', {});
  }

  public rejectJoiningForm(joinUsId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + joinUsId + '/reject', {});
  }
}
