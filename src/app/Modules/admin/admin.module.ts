import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './../../Guards/auth.guard';
import { AdminGuard } from './../../Guards/Admin.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationModuleRoutes } from 'src/app/routes/routes';
import { AdminSidebarComponent } from './component/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './component/admin-navbar/admin-navbar.component';
import { AdminBodyComponent } from './component/admin-body/admin-body.component';
import { AdminFooterComponent } from './component/admin-footer/admin-footer.component';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminNavbarComponent,
    AdminBodyComponent,
    AdminFooterComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(RegistrationModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    AdminSidebarComponent,
    AdminNavbarComponent,
    AdminBodyComponent,
    AdminFooterComponent,
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService]
})
export class AdminModule {}
