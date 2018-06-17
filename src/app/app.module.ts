import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatCardModule,
  MatRadioModule,
  MatTooltipModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatSliderModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule } from '@angular/material';

// Routing
import { RoutingConfig } from './app.routes';

// Services
import { BusService } from './services/bus.service';
import { RequestService } from './services/request.service';
import { EventsService } from './services/events.service';

// Interlayer
import { LoginService } from './services/login/login.service';
import { GetAllPatients } from './services/patients/getAll.service';
import { GetOnePatient } from './services/patients/getOne.service';
import { DeletePatient } from './services/patients/delete.service';
import { CreatePatient } from './services/patients/create.service';
import { EditPatient } from './services/patients/edit.service';
import { GetOneNote } from './services/note/getOne.service';
import { DeleteNote } from './services/note/delete.service';
import { CreateNote } from './services/note/create.service';
import { EditNote } from './services/note/edit.service';
import { RegistrationService } from './services/registration/registration.service';

// Interceptors
import { HeadersInterceptor } from './interceptors/interceptors.header';
import { EmptyResponseBodyErrorInterceptor } from './interceptors/interceptors.empty';
import { LoggingInterceptor } from './interceptors/interceptors.logging';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BookingComponent } from './components/booking/booking.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { CreateHospitalComponent } from './components/create-hospital/create-hospital.component';
import { DepartmentComponent } from './components/department/department.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patient/patient.component';
import { EditComponent } from './components/patient/edit/edit.component';
import { CreateComponent } from './components/patient/create/create.component';
import { NoteCreateComponent } from './components/patient/note-create/note-create.component';
import { NoteEditComponent } from './components/patient/note-edit/note-edit.component';
import { NoteOneComponent } from './components/patient/note-one/note-one.component';
// import { ModalComponent } from './components/popups/modal/modal.component';
// import { ErrorComponent } from './components/popups/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    AboutComponent,
    LoginComponent,
    RegistrationComponent,
    BookingComponent,
    CabinetComponent,
    CreateHospitalComponent,
    DepartmentComponent,
    ScheduleComponent,
    PatientsComponent,
    PatientComponent,
    EditComponent,
    CreateComponent,
    NoteCreateComponent,
    NoteEditComponent,
    NoteOneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    RoutingConfig,
  ],
  providers: [

    // Services
    BusService,
    EventsService,
    RequestService,

    // Interlayer
    LoginService,
    GetAllPatients,
    GetOnePatient,
    DeletePatient,
    CreatePatient,
    EditPatient,
    GetOneNote,
    DeleteNote,
    CreateNote,
    EditNote,
    RegistrationService,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmptyResponseBodyErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [ErrorComponent, ModalComponent]
})
export class AppModule {
  constructor (
    // private overlayContainer: OverlayContainer,
    // // Request Service
    // private authenticationService: AuthenticationService,

    // Interlayer
    private loginService: LoginService,
    private getAllPatients: GetAllPatients,
    private getOnePatient: GetOnePatient,
    private deletePatient: DeletePatient,
    private createPatient: CreatePatient,
    private editPatient: EditPatient,
    private getOneNote: GetOneNote,
    private deleteNote: DeleteNote,
    private createNote: CreateNote,
    private editNote: EditNote,
    private registrationService: RegistrationService,

    // private paramsService: ParamsService,
  ) {}
}
