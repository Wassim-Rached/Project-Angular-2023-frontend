import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// application based components
import { AppComponent } from './app.component';
import { HomeComponent } from './application/components/home/home.component';
import { AboutUsComponent } from './application/components/about-us/about-us.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
import { NavbarComponent } from './application/components/navbar/navbar.component';
import { FooterComponent } from './application/components/footer/footer.component';
import { DashboardComponent } from './application/components/dashboard/dashboard.component';
// activity based components
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivitiesPageComponent } from './application/components/activities-page/activities-page.component';
import { ActivitiesFeedComponent } from './application/components/activities-feed/activities-feed.component';
// user based components
import { ProfileComponent } from './application/components/profile/profile.component';
import { AccountPageComponent } from './application/components/account-page/account-page.component';
import { ChangePasswordComponent } from './application/components/change-password/change-password.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
// error based components
import { Error404Component } from './application/components/error404/error404.component';

@NgModule({
  declarations: [
    // application based components
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    AboutUsComponent,
    JoinUsComponent,
    DevTeamComponent,
    // activity based components
    ActivitiesFeedComponent,
    ActivityListComponent,
    ActivityOverViewComponent,
    ActivitiesPageComponent,
    // user based components
    AccountPageComponent,
    ChangePasswordComponent,
    SignInComponent,
    ProfileComponent,
    SignUpComponent,
    // error based components
    Error404Component,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
