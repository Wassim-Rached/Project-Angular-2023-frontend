import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main routes
import { HomeComponent } from './application/components/home/home.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
// Activity routes
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
// Account routes
import { AccountPageComponent } from './application/components/account-page/account-page.component';
// Auth routes
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
// Static routes
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
import { AboutUsComponent } from './application/components/about-us/about-us.component';
// Error routes
import { Error404Component } from './application/components/error404/error404.component';

// Guards
import { isAdminGuard } from './application/guards/is-admin.guard';
import { isUnauthenticatedGuard } from './application/guards/is-unauthenticated.guard';
import { isNotAdminGuard } from './application/guards/is-not-admin.guard';

const routes: Routes = [
  // Main routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'welcome to our club ', component: HomeComponent },
  {
    path: 'join-us',
    title: 'join us',
    component: JoinUsComponent,
    canActivate: [isNotAdminGuard],
  },

  // Dashboard routes
  {
    path: 'dashboard',
    canActivate: [isAdminGuard],
    loadChildren: () =>
      import('./application/admin/admin.module').then((m) => m.AdminModule),
  },

  // Activity routes
  {
    path: 'activities',
    title: 'activities',
    component: ActivityListComponent,
  },
  {
    path: 'activities/:id',
    title: 'activity',
    component: ActivityOverViewComponent,
  },

  // Profile routes
  {
    path: 'profile/:profileId',
    title: 'profile',
    component: AccountPageComponent,
  },

  // Static routes
  { path: 'dev-team', title: 'dev-team', component: DevTeamComponent },
  { path: 'about-us', title: 'about us', component: AboutUsComponent },

  // Auth routes
  {
    path: 'signin',
    title: 'signin',
    canActivate: [isUnauthenticatedGuard],
    component: SignInComponent,
  },
  {
    path: 'signup',
    title: 'signup',
    component: SignUpComponent,
    canActivate: [isUnauthenticatedGuard],
  },

  // Error routes
  { path: '**', title: 'NOT FOUND 404! ', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
