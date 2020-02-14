import { EditCandidateComponent } from './components/edit-candidate/edit-candidate.component';
import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { AuthenticationService } from './../../Services/Authentication/authentication.service';
import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthGuard } from './../../Guards/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCandidateComponent } from './components/create-candidate/create-candidate.component';
import { ListCandidateComponent } from './components/list-candidate/list-candidate.component';
import { CandidateModuleRoutes, CategoryModuleRoutes } from 'src/app/routes/routes';



@NgModule({
  declarations: [
    CreateCandidateComponent,
    ListCandidateComponent,
    EditCandidateComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(CategoryModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService, LoggedInGuard]
})
export class CandidateModule { }
