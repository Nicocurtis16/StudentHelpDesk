import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginPage/login/login.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { DashlayoutComponent } from './Dashboard/dashlayout/dashlayout.component';
import { InboxComponent } from './Dashboard/inbox/inbox.component';
import { UserManagerComponent } from './Dashboard/user-manager/user-manager.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'dashmain', component: DashlayoutComponent },
  { path: 'inbox', component: InboxComponent },
  {path: 'User Manager', component:UserManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
