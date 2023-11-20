import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application/components/home/home.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { Error404Component } from './application/components/error404/error404.component';
import { AccountPageComponent } from './application/components/account-page/account-page.component';
import { SignInComponent } from './application/components/sign-in/sign-in.component';
import { SignUpComponent } from './application/components/sign-up/sign-up.component';
import { JoinUsComponent } from './application/components/join-us/join-us.component';
import { DevTeamComponent } from './application/components/dev-team/dev-team.component';
import { isAdminGuard } from './application/guards/is-admin.guard';
import { isUnauthenticatedGuard } from './application/guards/is-unauthenticated.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [isAdminGuard],
    loadChildren: () =>
      import('./application/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'home', title: 'welcome to our club ', component: HomeComponent },
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

  { path: 'join-us', title: 'join us', component: JoinUsComponent },
  {
    path: 'profile/:profileId',
    title: 'profile',
    component: AccountPageComponent,
  },
  { path: 'dev-team', title: 'dev-team', component: DevTeamComponent },
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
  { path: '**', title: 'NOT FOUND 404! ', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
