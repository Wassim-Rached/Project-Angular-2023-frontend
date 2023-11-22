// different modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminRoutingModule } from './admin-routing.module';
// custom modules
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
// dashboard component
import { DashboardComponent } from './components/dashboard/dashboard.component';
// register components
import { RegistrationsListComponent } from './components/registrations-list/registrations-list.component';
import { RegistrationManagmentComponent } from './components/registration-managment/registration-managment.component';
// activity components
import { ActivityManagmentComponent } from './components/activity-managment/activity-managment.component';
import { ActivityListAdminComponent } from './components/activity-list-admin/activity-list-admin.component';
import { ActivityCreateAdminComponent } from './components/activity-create-admin/activity-create-admin.component';
import { ActivityModifyComponent } from './components/activity-modify/activity-modify.component';
// other components
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { GreetingAdminComponent } from './components/greeting-admin/greeting-admin.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { JoiningListAdminComponent } from './components/joining-list-admin/joining-list-admin.component';
import { JoinUsMangmentComponent } from './components/join-us-mangment/join-us-mangment.component';
import { JoinUsDetailsAdminComponent } from './components/join-us-details-admin/join-us-details-admin.component';

@NgModule({
  declarations: [
    // dashboard component
    DashboardComponent,
    // register based components
    RegistrationsListComponent,
    RegistrationManagmentComponent,

    // activity based components
    ActivityManagmentComponent,
    ActivityListAdminComponent,
    ActivityCreateAdminComponent,
    ActivityModifyComponent,
    // other components
    SideBarComponent,
    GreetingAdminComponent,
    JoiningListAdminComponent,
    JoinUsMangmentComponent,
    JoinUsDetailsAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    // custom modules
    MaterialModule,
    SharedModuleModule,
  ],
})
export class AdminModule {}
