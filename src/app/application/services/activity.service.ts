import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../classes/activity';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';
import { Registration } from '../classes/registration';
import { Status } from '../classes/join-us';
import { environment } from '../environments';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly URL = environment['BASE_API_URL'] + 'activities/';

  constructor(private http: HttpClient) {}

  public getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.URL + 'activity');
  }

  public getActivityById(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(this.URL + 'activity/' + activityId);
  }

  public createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.URL, activity);
  }

  public updateActivity(id: number, activity: Activity): Observable<Activity> {
    return this.http.patch<Activity>(this.URL + id, activity);
  }

  public deleteActivity(id: number) {
    return this.http.delete(this.URL + id);
  }

  public getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL + 'categories');
  }

  public createCatgorie(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.URL, category);
  }

  public getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.URL + 'registrations');
  }

  public getActivityRegistrations(
    activityId: string
  ): Observable<Registration> {
    return this.http.get<Registration>(
      this.URL + activityId + '/registrations'
    );
  }

  public registerToActivity(activityId: string) {
    return this.http.post(this.URL + '/registrations', {
      activity: activityId,
    });
  }

  public unregisterFromActivity() {
    return this.http.delete(this.URL + '/registrations');
  }

  public acceptRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + registerationId + '/registrations/accept',
      {}
    );
  }

  public rejectRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + registerationId + '/registrations/reject',
      {}
    );
  }

  public payRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + registerationId + '/registrations/pay',
      {}
    );
  }

  public unpayRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + registerationId + '/registrations/unpay',
      {}
    );
  }

  public toggleLike(activityId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + activityId, {});
  }
}
