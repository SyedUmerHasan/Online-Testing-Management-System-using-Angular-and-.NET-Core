import { AdminGuard } from './../Guards/Admin.guard';
import { PageNotFoundComponent } from './../Modules/page-not-found/page-not-found.component';
import { AuthGuard } from './../Guards/auth.guard';
import { IndexComponent } from './../Modules/home/components/index/index.component';
import { SignUpComponent } from './../Modules/registration/component/sign-up/sign-up.component';
import { LoginComponent } from './../Modules/registration/component/login/login.component';

import { Routes } from '@angular/router';

// Using ForRoot
const HomeModuleRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

// Using ForRoot
const RegistrationModuleRoutes: Routes = [
  {path : 'login' , component : LoginComponent },
  {path : 'signup' , component : SignUpComponent},
  // {path : '**' ,  redirectTo: '/login', pathMatch: 'full'}
];

// Using ForChild
const AppModuleRoutes: Routes = [
  {path : 'dashboard/home', canActivate : [AuthGuard] , component : IndexComponent},
  {path : 'dashboard/admin', canActivate : [AdminGuard] , component : IndexComponent},
];
// Using ForChild
const PagenotFoundModuleRoutes: Routes = [
  // {path : '**' , component : PageNotFoundComponent},
];

export {
  RegistrationModuleRoutes,
  HomeModuleRoutes,
  AppModuleRoutes,
  PagenotFoundModuleRoutes
};
