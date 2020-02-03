import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { SignUpComponent } from './../registration/component/sign-up/sign-up.component';
import { LoginComponent } from './../registration/component/login/login.component';
import { Routes } from '@angular/router';

// Using ForRoot
const MainApplicationRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

// Using ForRoot
const HomeApplicationRoutes: Routes = [
  {path : 'login' , component : LoginComponent },
  {path : 'signup' , component : SignUpComponent},
  {path : '**' ,  redirectTo: '/login', pathMatch: 'full'}
];

export {
  HomeApplicationRoutes,
  MainApplicationRoutes
};
