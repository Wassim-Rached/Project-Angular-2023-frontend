import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './application/components/home/home.component';
import { AboutUsComponent } from './application/components/about-us/about-us.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
import { ActivitiesFeedComponent } from './application/components/activities-feed/activities-feed.component';
import { ActivityDetailsComponent } from './application/components/activity-details/activity-details.component';
import { ProfileComponent } from './application/components/profile/profile.component';
import { NavbarComponent } from './application/components/navbar/navbar.component';
import { FooterComponent } from './application/components/footer/footer.component';
import { DashboardComponent } from './application/components/dashboard/dashboard.component';
import { RegistrationsListComponent } from './application/components/registrations-list/registrations-list.component';
import { RegistrationManagmentComponent } from './application/components/registration-managment/registration-managment.component';
import { RegistrationDetailsComponent } from './application/components/registration-details/registration-details.component';
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityManagmentComponent } from './application/components/activity-managment/activity-managment.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
import { ChangePasswordComponent } from './application/components/change-password/change-password.component';
import { Error404Component } from './application/components/error404/error404.component';
import { ActivitiesPageComponent } from './application/components/activities-page/activities-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    JoinUsComponent,
    DevTeamComponent,
    ActivitiesFeedComponent,
    ActivityDetailsComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    RegistrationsListComponent,
    RegistrationManagmentComponent,
    RegistrationDetailsComponent,
    ActivityOverViewComponent,
    ActivityListComponent,
    ActivityManagmentComponent,
    SignInComponent,
    SignUpComponent,
    ChangePasswordComponent,
    Error404Component,
    ActivitiesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
