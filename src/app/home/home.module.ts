import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

/** Modules */
import { ReactiveFormsModule } from '@angular/forms';

/** Components */
import { IndexComponent } from './components/index/index.component';
import { UserComponent } from './components/user/user.component';

/** variable declaration */
const approutes = [
  {path : 'home' , component : IndexComponent},
];

@NgModule({
  declarations: [
    IndexComponent,
    UserComponent
  ],
  imports: [
    RouterModule.forChild(approutes),
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    IndexComponent,
    UserComponent
  ]
})
export class HomeModule { }
