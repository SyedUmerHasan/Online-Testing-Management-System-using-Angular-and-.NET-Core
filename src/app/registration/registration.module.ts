import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/** Modules */
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Components */
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';

/** Routes */
import { HomeApplicationRoutes } from '../routes/routes';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    RouterModule.forRoot(HomeApplicationRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports : [
    RouterModule,
    LoginComponent,
    SignUpComponent
  ]
})

export class RegistrationModule { }
