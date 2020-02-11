import { Routes } from '@angular/router';

/** Guards */
import { AdminGuard } from './../Guards/Admin.guard';
import { AuthGuard } from './../Guards/auth.guard';
import { LoggedInGuard } from './../Guards/LoggedIn.guard';

/** Components */
import { PageNotFoundComponent } from './../Modules/page-not-found/component/page-not-found.component';
import { IndexComponent } from '../Modules/home/component/index/index.component';
import { SignUpComponent } from '../Modules/registration/component/sign-up/sign-up.component';
import { LoginComponent } from '../Modules/registration/component/login/login.component';

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
  {
    path : 'dashboard/home',
    canActivate : [AuthGuard, LoggedInGuard],
    component : IndexComponent
  },
  {
    path : 'dashboard/admin',
    canActivate : [AdminGuard, LoggedInGuard],
    component : IndexComponent
  },
];
// Using ForChild
const PagenotFoundModuleRoutes: Routes = [
  {path : '**' , component : PageNotFoundComponent },
];

export {
  RegistrationModuleRoutes,
  HomeModuleRoutes,
  AppModuleRoutes,
  PagenotFoundModuleRoutes
};
