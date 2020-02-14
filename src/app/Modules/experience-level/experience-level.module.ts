import { ListExperienceComponent } from './components/list-experience/list-experience.component';
import { AuthGuard } from './../../Guards/auth.guard';
import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthenticationService } from './../../Services/Authentication/authentication.service';
import { LoggedInGuard } from 'src/app/Guards/LoggedIn.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CandidateModuleRoutes, ExperienceLevelModuleRoutes } from 'src/app/routes/routes';
import { CreateExperienceComponent } from './components/create-experience/create-experience.component';
import { EditExperienceComponent } from './components/edit-experience/edit-experience.component';



@NgModule({
  declarations: [
    CreateExperienceComponent,
    EditExperienceComponent,
    ListExperienceComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(ExperienceLevelModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
    CreateExperienceComponent,
    EditExperienceComponent,
    ListExperienceComponent,
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService, LoggedInGuard]
})
export class ExperienceLevelModule { }
