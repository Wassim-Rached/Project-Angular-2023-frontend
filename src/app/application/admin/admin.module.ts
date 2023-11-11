import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// dashboard component
import { DashboardComponent } from './components/dashboard/dashboard.component';
// register components
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { RegistrationManagmentComponent } from './components/registration-managment/registration-managment.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';
// activity components
import { ActivityManagmentComponent } from './components/activity-managment/activity-managment.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';

@NgModule({
  declarations: [
    // dashboard component
    DashboardComponent,
    // register based components
    RegistrationsListComponent,
    RegistrationManagmentComponent,
    RegistrationDetailsComponent,
    // activity based components
    ActivityDetailsComponent,
    ActivityManagmentComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
