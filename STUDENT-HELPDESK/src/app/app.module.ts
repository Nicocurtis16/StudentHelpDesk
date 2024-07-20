import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './LoginPage/login/login.component';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { DashlayoutComponent } from './Dashboard/dashlayout/dashlayout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    DashlayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
