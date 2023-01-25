import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/login/new-user/new-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LateralMenuComponent } from "./components/lateral-menu/lateral-menu.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PacientRegistrationComponent } from './pages/pacient-registration/pacient-registration.component';
import { AppointmentRegistrationComponent } from './pages/appointment-registration/appointment-registration.component';
import { ExamRegistrationComponent } from './pages/exam-registration/exam-registration.component';
import { RecordsListingComponent } from './pages/records-listing/records-listing.component';
import { PacientRecordsComponent } from './pages/pacient-records/pacient-records.component';
import { ValidDobDirective } from './validators/date-of-birth/valid-dob.directive';
import { CpfDirective } from './validators/cpf/cpf.directive';
import { InputMaskModule } from "primeng/inputmask";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SystemStatisticsComponent } from './components/system-statistics/system-statistics.component';
import { CardModule } from 'primeng/card';
import { PacientCardComponent } from './components/pacient-card/pacient-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    HomeComponent,
    ToolbarComponent,
    StatisticsComponent,
    LateralMenuComponent,
    PacientRegistrationComponent,
    AppointmentRegistrationComponent,
    ExamRegistrationComponent,
    RecordsListingComponent,
    PacientRecordsComponent,
    ValidDobDirective,
    CpfDirective,
    SystemStatisticsComponent,
    PacientCardComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    InputMaskModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    CardModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
