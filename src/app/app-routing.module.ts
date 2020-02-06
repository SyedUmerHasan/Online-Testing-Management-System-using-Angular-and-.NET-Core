import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { HomeModule } from './Modules/home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Routes */
import { HomeModuleRoutes, AppModuleRoutes } from './routes/routes';
import { RegistrationModule } from './Modules/registration/registration.module';


@NgModule({
  imports: [
    HomeModule,
    RegistrationModule,
    RouterModule.forRoot(AppModuleRoutes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule { }
