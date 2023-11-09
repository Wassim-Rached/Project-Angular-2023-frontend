import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application/components/home/home.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivitiesPageComponent } from './application/components/activities-page/activities-page.component';
import { Error404Component } from './application/components/error404/error404.component';
import { AccountPageComponent } from './application/components/account-page/account-page.component';
import { ProfileComponent } from './application/components/profile/profile.component';
import { ChangePasswordComponent } from './application/components/change-password/change-password.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./application/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },
  { path: 'home', title: 'welcome to our club ', component: HomeComponent },
  {
    path: 'activities',
    title: 'activities',
    component: ActivitiesPageComponent,
    children: [
      {
        path: '',
        title: 'activities',
        component: ActivityListComponent,
      },
      {
        path: ':id',
        title: 'activity',
        component: ActivityOverViewComponent,
      },
    ],
  },
  { path: 'join-us', title: 'join us', component: JoinUsComponent },
  {
    path: 'account',
    title: 'account',
    component: AccountPageComponent,
    children: [
      { path: 'profile', title: 'Profile', component: ProfileComponent },
      {
        path: 'change-password',
        title: 'change password',
        component: ChangePasswordComponent,
      },
    ],
  },
  { path: 'signin', title: 'signin', component: SignInComponent },
  { path: 'signup', title: 'signup', component: SignUpComponent },
  { path: '**', title: 'NOT FOUND 404! ', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
