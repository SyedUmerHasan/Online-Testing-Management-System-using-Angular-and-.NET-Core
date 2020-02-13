import { AdminBodyComponent } from './../Modules/admin/component/admin-body/admin-body.component';
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
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [LoggedInGuard]
  },
  {
    path : 'signup',
    component : SignUpComponent,
    canActivate : [LoggedInGuard]
  },
];

// Using ForChild
const AppModuleRoutes: Routes = [
  {
    path : 'home',
    component : IndexComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'home/dashboard',
    component : IndexComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'admin',
    component : AdminBodyComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/umer',
    component : AdminBodyComponent,
    canActivate : [AdminGuard]
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
