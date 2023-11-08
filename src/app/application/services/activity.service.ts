import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../classes/activity';
import { Observable } from 'rxjs';
import { Categorie } from '../classes/categorie';
import { Registration } from '../classes/registration';
import { Status } from '../classes/join-us';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly URL = "https://mini-project-iset.onrender.com/api/activities/"
  constructor(private http: HttpClient) { }
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.URL);
  }
  getActivityById(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(this.URL + "activity/" + activityId);
  }
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.URL, activity)
  }
  updateActivity(id: number, activity: Activity): Observable<Activity> {
    return this.http.patch<Activity>(this.URL + id, activity)
  }
  deleteActivity(id: number) {
    return this.http.delete(this.URL + id);
  }
  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL + "categories")
  }
  createCatgorie(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.URL, category)
  }
  getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.URL + "registrations")
  }
  getActivityRegistrations(activityId: string): Observable<Registration> {
    return this.http.get<Registration>(this.URL + activityId + "/registrations")
  }
  registerToActivity(activityId: string) {
    return this.http.post(this.URL + "/registrations", { activity: activityId })
  }
  unregisterFromActivity() {
    return this.http.delete(this.URL + "/registrations")
  }
  acceptRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + registerationId + "/registrations/accept", {})
  }
  rejectRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + registerationId + "/registrations/reject", {})
  }
  payRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + registerationId + "/registrations/pay", {})
  }
  unpayRegistration(registerationId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + registerationId + "/registrations/unpay", {})
  }
  toggleLike(activityId: string): Observable<Status> {
    return this.http.post<Status>(this.URL + activityId, {})
  }
}



