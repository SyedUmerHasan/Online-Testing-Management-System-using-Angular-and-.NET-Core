import { DashboardAnalyticsComponent } from './component/dashboard-analytics/dashboard-analytics.component';
import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './../../Guards/auth.guard';
import { AdminGuard } from './../../Guards/Admin.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminModuleRoutes } from 'src/app/routes/routes';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@NgModule({
  declarations: [
    DashboardAnalyticsComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(AdminModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    DashboardAnalyticsComponent
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService, LoggedInGuard]
})
export class AdminModule {}
