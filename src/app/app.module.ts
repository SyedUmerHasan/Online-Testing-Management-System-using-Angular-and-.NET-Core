import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Component */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './Modules/page-not-found/page-not-found.component';

/** Template */
import { RegistrationTemplateComponent } from './template/registration-template/registration-template.component';
import { AdminPanelTemplateComponent } from './template/admin-panel-template/admin-panel-template.component';

/** Modules */
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    // Add Components here
    AppComponent,
    PageNotFoundComponent,
    // Add Templates in the end
    RegistrationTemplateComponent,
    AdminPanelTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    // Import Customized Modules here
    AppRoutingModule,
    NgZorroAntdModule,
    ScrollingModule,
    // Store Modules
    // StoreModule.forRoot({
    //   message: simpleReducer,
    //   posts: PostReducer,
    // }),
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent] // Default template to be shown here
})
export class AppModule { }
