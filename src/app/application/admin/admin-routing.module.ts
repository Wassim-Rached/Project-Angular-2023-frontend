import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GreetingAdminComponent } from './components/greeting-admin/greeting-admin.component';

const routes: Routes = [
  {
    path: '',
    title: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'greeting', pathMatch: 'full' },
      { path: 'greeting', title: 'welcome', component: GreetingAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
