import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStartComponent } from "./pages/login-start/login-start.component";

const routes: Routes = [
  {
    path: '',
    component: LoginStartComponent
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
