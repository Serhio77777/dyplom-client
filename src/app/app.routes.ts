import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BookingComponent } from './components/booking/booking.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DashComponent } from './components/dash/dash.component';
import { EditComponent } from './components/patient/edit/edit.component';
import { CreateComponent } from './components/patient/create/create.component';
import { NoteCreateComponent } from './components/patient/note-create/note-create.component';
import { NoteEditComponent } from './components/patient/note-edit/note-edit.component';
import { NoteOneComponent } from './components/patient/note-one/note-one.component';

// Guards
// import { AuthenticationGuard } from './guards/authentication-guard'; -> comming soon

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'dash',
    component: DashComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'patient',
    component: PatientsComponent
  },
  {
    path: 'profile',
    component: CabinetComponent
  },
  {
    path: 'patient/:id',
    component: PatientComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'note/:id',
    component: NoteOneComponent
  },
  {
    path: 'edit-note/:id',
    component: NoteEditComponent
  },
  {
    path: 'create-note',
    component: NoteCreateComponent
  },
  // {
  //   path: '**',
  //   component: LoginComponent
  // }, //TODO: 404 page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class RoutingConfig {}
