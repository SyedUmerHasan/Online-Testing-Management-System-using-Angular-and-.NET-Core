import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthGuard } from './../../Guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/** Modules */
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Components */
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

/** Routes */
import { RegistrationModuleRoutes } from 'src/app/routes/routes';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    RouterModule.forRoot(RegistrationModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports : [
    RouterModule,
    LoginComponent,
    SignUpComponent
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard],

})

export class RegistrationModule { }
