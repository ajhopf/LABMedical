import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuardGuard } from "./guards/auth-guard.guard";
import { StatisticsComponent } from "./pages/statistics/statistics.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardGuard],
    data: {
      statistics: 'Estatísticas e Informações'
    },
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'statistics'
      }, {
        path:'statistics',
        component: StatisticsComponent,
      }
    ]
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
