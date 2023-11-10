import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// application based components
import { AppComponent } from './app.component';
import { HomeComponent } from './application/components/home/home.component';
import { AboutUsComponent } from './application/components/about-us/about-us.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
import { NavbarComponent } from './application/components/navbar/navbar.component';
import { FooterComponent } from './application/components/footer/footer.component';
import { DashboardComponent } from './application/components/dashboard/dashboard.component';
import { GreetingComponent } from './application/components/greeting/greeting.component';
import { HotActivitiesComponent } from './application/components/hot-activities/hot-activities.component';
// activity based components
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivitiesPageComponent } from './application/components/activities-page/activities-page.component';
import { ActivitiesFeedComponent } from './application/components/activities-feed/activities-feed.component';
import { ActivityCardComponent } from './application/components/activity-card/activity-card.component';
// user based components
import { ProfileComponent } from './application/components/profile/profile.component';
import { AccountPageComponent } from './application/components/account-page/account-page.component';
import { ChangePasswordComponent } from './application/components/change-password/change-password.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
// error based components
import { Error404Component } from './application/components/error404/error404.component';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './application/services/auth-interceptor.service';

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
    GreetingComponent,
    HotActivitiesComponent,
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
    ActivityCardComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    // other services
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
