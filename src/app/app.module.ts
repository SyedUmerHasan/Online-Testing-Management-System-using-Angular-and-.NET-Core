import { JwtInterceptor } from './_helper/jwt.interceptor';
import { LoggedInGuard } from './Guards/LoggedIn.guard';
import { AdminSidebarComponent } from './Modules/admin/component/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './Modules/admin/component/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './Modules/admin/component/admin-footer/admin-footer.component';
import { AdminBodyComponent } from './Modules/admin/component/admin-body/admin-body.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';


/** Component */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './Modules/page-not-found/component/page-not-found.component';

/** Template */
import { RegistrationTemplateComponent } from './template/registration-template/registration-template.component';
import { AdminPanelTemplateComponent } from './template/admin-panel-template/admin-panel-template.component';

/** Modules */
import { AppRoutingModule } from './app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    // Add Components here
    AppComponent,
    PageNotFoundComponent,
    // Add Templates in the end
    RegistrationTemplateComponent,
    AdminPanelTemplateComponent,
    // Adding Components
    AdminBodyComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(), // ToastrModule added
    MatSliderModule,
    HttpClientModule,
    // Import Customized Modules here
    AppRoutingModule,
    NzIconModule,
    NgZorroAntdModule,
    ScrollingModule,

    // Store Modules
    // StoreModule.forRoot({
    //   message: simpleReducer,
    //   posts: PostReducer,
    // }),
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent] // Default template to be shown here
})
export class AppModule { }
