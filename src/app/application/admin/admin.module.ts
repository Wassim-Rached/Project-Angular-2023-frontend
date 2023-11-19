// different modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

// dashboard component
import { DashboardComponent } from './components/dashboard/dashboard.component';

// register components
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { RegistrationManagmentComponent } from './components/registration-managment/registration-managment.component';
import { RegistrationDetailsComponent } from './components/registration-details/registration-details.component';

// activity components
import { ActivityManagmentComponent } from './components/activity-managment/activity-managment.component';
import { ActivityListAdminComponent } from './components/activity-list-admin/activity-list-admin.component';
import { ActivityCreateAdminComponent } from './components/activity-create-admin/activity-create-admin.component';
import { ActivityModifyComponent } from './components/activity-modify/activity-modify.component';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { GreetingAdminComponent } from './components/greeting-admin/greeting-admin.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserNameFormaterPipe } from '../pipes/user-name-formater.pipe';
@NgModule({
  declarations: [
    // dashboard component
    DashboardComponent,
    // register based components
    RegistrationsListComponent,
    RegistrationManagmentComponent,
    RegistrationDetailsComponent,
    // activity based components
    ActivityManagmentComponent,
    SideBarComponent,
    GreetingAdminComponent,
    ActivityListAdminComponent,
    ActivityCreateAdminComponent,
    ActivityModifyComponent,
    //pipes
    UserNameFormaterPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class AdminModule {}
