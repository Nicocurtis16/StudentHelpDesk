import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginPage/login/login.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { DashlayoutComponent } from './Dashboard/dashlayout/dashlayout.component';
import { InboxComponent } from './Dashboard/inbox/inbox.component';
import { UserManagerComponent } from './Dashboard/user-manager/user-manager.component';
import { AdminComponent } from './Dashboard/User/admin/admin.component';
import { StudentComponent } from './Dashboard/User/student/student.component';
import { ChatComponent } from './Dashboard/chat/chat.component';
import { ProfileComponent } from './Dashboard/profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'dashmain', component: DashlayoutComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'inbox',
    component: InboxComponent,
    children: [{ path: 'chat', component: ChatComponent }],
  },

  {
    path: 'User Manager',
    component: UserManagerComponent,
    children: [
      { path: 'student', component: StudentComponent },
      { path: 'admin', component: AdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
