import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GreetingAdminComponent } from './components/greeting-admin/greeting-admin.component';
import { ActivityManagmentComponent } from './components/activity-managment/activity-managment.component';
import { ActivityListAdminComponent } from './components/activity-list-admin/activity-list-admin.component';
import { ActivityCreateAdminComponent } from './components/activity-create-admin/activity-create-admin.component';
import { RegistrationManagmentComponent } from './components/registration-managment/registration-managment.component';
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { ActivityModifyComponent } from './components/activity-modify/activity-modify.component';

const routes: Routes = [
  {
    path: '',
    title: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'greeting', pathMatch: 'full' },
      { path: 'greeting', title: 'welcome', component: GreetingAdminComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
