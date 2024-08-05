import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './LoginPage/login/login.component';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { DashlayoutComponent } from './Dashboard/dashlayout/dashlayout.component';
import { InboxComponent } from './Dashboard/inbox/inbox.component';
import { ChatComponent } from './Dashboard/chat/chat.component';
import { UserManagerComponent } from './Dashboard/user-manager/user-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    DashlayoutComponent,
    InboxComponent,
    ChatComponent,
    UserManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
