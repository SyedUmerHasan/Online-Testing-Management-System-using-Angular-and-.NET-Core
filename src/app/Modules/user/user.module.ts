import { NgxSpinnerModule } from 'ngx-spinner';
import { TestModuleRoutes, UserModuleRoutes } from 'src/app/routes/routes';
import { UserService } from './../../Services/Users/user.service';
import { QuestionsService } from './../../Services/Questions/questions.service';
import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { AdminGuard } from 'src/app/Guards/Admin.guard';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  CreateUserComponent
],
  imports: [
    RouterModule.forRoot(UserModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxSpinnerModule
  ],
  exports : [
    RouterModule,
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard, QuestionsService, UserService],

})
export class UserModule { }
