import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './application/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: "dashboard", loadChildren: () => import('./application/admin/admin-routing.module').then(m => m.AdminRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
