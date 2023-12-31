// diffrent modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// custom modules
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './application/services/auth-interceptor.service';

// application based components
import { AppComponent } from './app.component';
import { HomeComponent } from './application/components/home/home.component';
import { NavbarComponent } from './application/components/navbar/navbar.component';
import { FooterComponent } from './application/components/footer/footer.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
// static components
import { GreetingComponent } from './application/components/greeting/greeting.component';
import { AboutUsComponent } from './application/components/about-us/about-us.component';
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
// activity based components
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityCardComponent } from './application/components/activity-card/activity-card.component';
import { HotActivitiesComponent } from './application/components/hot-activities/hot-activities.component';
import { ActivityCardSkeletonComponent } from './application/components/skeletons/activity-card-skeleton/activity-card-skeleton.component';
// user based components
import { ProfileComponent } from './application/components/profile/profile.component';
import { AccountPageComponent } from './application/components/account-page/account-page.component';
import { ChangePasswordComponent } from './application/components/change-password/change-password.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
// registration based components
import { ProfileRegistrationsComponent } from './application/components/profile-registrations/profile-registrations.component';
// error based components
import { Error404Component } from './application/components/error404/error404.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { ProfileDeleteComponent } from './application/components/profile-delete/profile-delete.component';
import { ProfileAboutComponent } from './application/components/profile-about/profile-about.component';

@NgModule({
  declarations: [
    // application based components
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    JoinUsComponent,
    // static components
    GreetingComponent,
    AboutUsComponent,
    DevTeamComponent,
    // activity based components
    ActivityListComponent,
    ActivityOverViewComponent,
    ActivityCardComponent,
    HotActivitiesComponent,
    ActivityCardSkeletonComponent,
    // user based components
    AccountPageComponent,
    ChangePasswordComponent,
    SignInComponent,
    ProfileComponent,
    SignUpComponent,
    // registration based components
    ProfileRegistrationsComponent,
    ProfileDeleteComponent,
    ProfileAboutComponent,
    // error based components
    Error404Component,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // custom modules
    MaterialModule,
    SharedModuleModule,
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
