import { CandidateModule } from './Modules/candidate/candidate.module';
import { AdminModule } from './Modules/admin/admin.module';
import { PageNotFoundModule } from './Modules/page-not-found/page-not-found.module';
import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { HomeModule } from './Modules/home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Routes */
import { RegistrationModule } from './Modules/registration/registration.module';


@NgModule({
  imports: [
    HomeModule,
    RegistrationModule,
    AdminModule,
    // Include all modules here
    CandidateModule,
    // PageNotFoundModule Must be place at the end
    PageNotFoundModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule { }
