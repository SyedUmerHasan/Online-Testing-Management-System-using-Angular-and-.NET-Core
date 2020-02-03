import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Routes */
import { MainApplicationRoutes } from './routes/routes';


@NgModule({
  imports: [
    RouterModule.forRoot(
      MainApplicationRoutes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
