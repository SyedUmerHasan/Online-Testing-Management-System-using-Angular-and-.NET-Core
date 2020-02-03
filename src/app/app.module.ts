
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Component */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/** Template */
import { RegistrationTemplateComponent } from './template/registration-template/registration-template.component';
import { AdminPanelTemplateComponent } from './template/admin-panel-template/admin-panel-template.component';

/** Modules */
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationModule } from './registration/registration.module';

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
    HomeModule,
    AppRoutingModule,
    RegistrationModule,
  ],
  providers: [],
  bootstrap: [RegistrationTemplateComponent] // Default template to be shown here
})
export class AppModule { }
