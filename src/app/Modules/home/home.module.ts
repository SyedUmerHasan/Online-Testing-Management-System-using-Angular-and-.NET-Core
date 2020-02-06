import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthGuard } from './../../Guards/auth.guard';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

/** Modules */
import { ReactiveFormsModule } from '@angular/forms';

/** Components */
import { IndexComponent } from './components/index/index.component';
import { UserComponent } from './components/user/user.component';

/** variable declaration */
import { AppModuleRoutes, HomeModuleRoutes } from 'src/app/routes/routes';


@NgModule({
  declarations: [
    IndexComponent,
    UserComponent
  ],
  imports: [
    RouterModule.forChild(HomeModuleRoutes),
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    IndexComponent,
    UserComponent
  ],
  providers: [AuthGuard, AdminGuard],
})
export class HomeModule { }
