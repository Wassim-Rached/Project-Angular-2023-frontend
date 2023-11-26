import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../classes/activity';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';
import { Registration } from '../classes/registration';
import { Status } from '../classes/join-us';
import { environment } from '../environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly URL = environment['BASE_API_URL'] + 'activities/';

  constructor(private http: HttpClient, private router: Router) {}

  // activities management
  public getAllActivities(params?: HttpParams): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.URL, { params: params });
  }

  public getActivityById(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(this.URL + activityId);
  }

  public createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.URL, activity);
  }

  public updateActivity(id: string, activity: Activity): Observable<Activity> {
    return this.http.patch<Activity>(this.URL + id, activity);
  }

  public deleteActivityById(id: string) {
    return this.http.delete(this.URL + id);
  }

  // categories management
  public getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL + 'categories');
  }

  public createCatgorie(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.URL, category);
  }

  // registrations management
  public getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.URL + 'registrations');
  }

  public getActivityRegistrations(
    activityId: string
  ): Observable<Registration[]> {
    return this.http.get<Registration[]>(
      this.URL + activityId + '/registrations'
    );
  }

  public getAllMyActivityRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.URL + 'registrations/mine');
  }

  public registerToActivity(activityId: string): Observable<Registration> {
    return this.http.post<Registration>(this.URL + 'registrations/', {
      activity: activityId,
    });
  }

  public acceptRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'registrations/' + registerationId + '/accept/',
      {}
    );
  }

  public rejectRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'registrations/' + registerationId + '/reject/',
      {}
    );
  }

  public payRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'registrations/' + registerationId + '/pay/',
      {}
    );
  }

  public unpayRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(
      this.URL + 'registrations/' + registerationId + '/unpay/',
      {}
    );
  }

  // likes management
  public didLike(activityId: string): Observable<{ did_like: boolean }> {
    return this.http.get<{ did_like: boolean }>(
      this.URL + activityId + '/did_like/'
    );
  }

  public setLiked(activityId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + activityId + '/like/', {});
  }
}
