import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application/components/home/home.component';
import { ActivityListComponent } from './application/components/activity-list/activity-list.component';
import { ActivityOverViewComponent } from './application/components/activity-over-view/activity-over-view.component';
import { ActivitiesPageComponent } from './application/components/activities-page/activities-page.component';
import { Error404Component } from './application/components/error404/error404.component';

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
  { path: '**', title: 'NOT FOUND 404! ', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
