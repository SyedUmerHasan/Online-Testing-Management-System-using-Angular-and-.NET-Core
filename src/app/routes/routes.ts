import { EditCandidateComponent } from './../Modules/candidate/components/edit-candidate/edit-candidate.component';
import { ListCandidateComponent } from './../Modules/candidate/components/list-candidate/list-candidate.component';
import { CreateCandidateComponent } from './../Modules/candidate/components/create-candidate/create-candidate.component';
import { DashboardAnalyticsComponent } from './../Modules/admin/component/dashboard-analytics/dashboard-analytics.component';
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

// Using ForRoot
const AdminModuleRoutes: Routes = [
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
    component : DashboardAnalyticsComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/umer',
    component : DashboardAnalyticsComponent,
    canActivate : [AdminGuard]
  },
];

// Using ForRoot
const UserModuleRoutes: Routes = [
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
];

// Using ForRoot
const CandidateModuleRoutes: Routes = [
  {
    path : 'admin/candidate',
    redirectTo : 'admin/candidate/list',
    canActivate : [AdminGuard],
    pathMatch: 'full'
  },
  {
    path : 'admin/candidate/list',
    component : ListCandidateComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/candidate/create',
    component : CreateCandidateComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/candidate/edit',
    component : EditCandidateComponent,
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
  AdminModuleRoutes,
  UserModuleRoutes,
  PagenotFoundModuleRoutes,
  CandidateModuleRoutes
};
