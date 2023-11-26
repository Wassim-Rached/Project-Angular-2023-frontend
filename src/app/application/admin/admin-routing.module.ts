import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main routes
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GreetingAdminComponent } from './components/greeting-admin/greeting-admin.component';
// Activity routes
import { ActivityManagmentComponent } from './components/activity-managment/activity-managment.component';
import { ActivityListAdminComponent } from './components/activity-list-admin/activity-list-admin.component';
import { ActivityCreateAdminComponent } from './components/activity-create-admin/activity-create-admin.component';
import { ActivityModifyComponent } from './components/activity-modify/activity-modify.component';
// Registration routes
import { RegistrationManagmentComponent } from './components/registration-managment/registration-managment.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
// Joining routes
import { JoiningListAdminComponent } from './components/joining-list-admin/joining-list-admin.component';
import { JoinUsMangmentComponent } from './components/join-us-mangment/join-us-mangment.component';
import { JoinUsDetailsAdminComponent } from './components/join-us-details-admin/join-us-details-admin.component';

const routes: Routes = [
  {
    path: '',
    title: 'dashboard',
    component: DashboardComponent,
    children: [
      // Main routes
      { path: '', redirectTo: 'greeting', pathMatch: 'full' },
      { path: 'greeting', title: 'welcome', component: GreetingAdminComponent },
      // Activity routes
      {
        path: 'activities',
        title: 'activities',
        component: ActivityManagmentComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            title: 'activity list',
            component: ActivityListAdminComponent,
          },
          {
            path: 'list/:activityId',
            title: 'update activity',
            component: ActivityModifyComponent,
          },
          {
            path: 'create',
            title: 'activity create',
            component: ActivityCreateAdminComponent,
          },
        ],
      },
      // Registration routes
      {
        path: 'registrations',
        title: 'registrations',
        component: RegistrationManagmentComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            title: 'registration list',
            component: RegistrationsListComponent,
          },
        ],
      },
      // Joining routes
      {
        path: 'join-us',
        title: 'joining registrations',
        component: JoinUsMangmentComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            title: 'joining registration form',
            component: JoiningListAdminComponent,
          },
          {
            path: 'list/:joinUsId',
            title: 'details of registrations',
            component: JoinUsDetailsAdminComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
