import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuardGuard } from "./shared/guards/auth-guard.guard";
import { StatisticsComponent } from "./pages/statistics/statistics.component";
import { PacientRegistrationComponent } from "./pages/pacient-registration/pacient-registration.component";
import { RecordsListingComponent } from "./pages/records-listing/records-listing.component";
import { AppointmentRegistrationComponent } from "./pages/appointment-registration/appointment-registration.component";
import { ExamRegistrationComponent } from "./pages/exam-registration/exam-registration.component";
import { PacientRecordsComponent } from "./pages/pacient-records/pacient-records.component";
import {  redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }, {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'statistics'
      }, {
        path:'statistics',
        component: StatisticsComponent
      }, {
        path: 'pacient-registration',
        component: PacientRegistrationComponent,
      },{
        path: 'pacient-registration/:id',
        component: PacientRegistrationComponent
      }, {
        path: 'records-listing',
        component: RecordsListingComponent
      }, {
        path: 'appointment-registration',
        component: AppointmentRegistrationComponent
      },{
        path: 'appointment-registration/:id',
        component: AppointmentRegistrationComponent
      }, {
        path: 'exam-registration',
        component: ExamRegistrationComponent
      }, {
        path: 'exam-registration/:id',
        component: ExamRegistrationComponent
      }, {
        path: 'pacient-records/:id',
        component: PacientRecordsComponent
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
