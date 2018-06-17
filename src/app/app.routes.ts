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
import { EditComponent } from './components/patient/edit/edit.component';
import { CreateComponent } from './components/patient/create/create.component';

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
    path: 'cabinet',
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