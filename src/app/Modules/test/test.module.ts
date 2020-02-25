import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { LoggedInGuard } from 'src/app/Guards/LoggedIn.guard';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from 'src/app/Guards/Admin.guard';
import { RegistrationModuleRoutes, TestModuleRoutes } from 'src/app/routes/routes';
import { StartTestComponent } from './components/start-test/start-test.component';
import { TestScreenComponent } from './components/test-screen/test-screen.component';



@NgModule({
  declarations: [
    CreateTestComponent,
    StartTestComponent,
    TestScreenComponent
  ],
  imports: [
    RouterModule.forRoot(TestModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports : [
    RouterModule,
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard, QuestionsService],

})
export class TestModule { }
