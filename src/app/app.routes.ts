import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreateVacationComponent } from './components/create-vacation/create-vacation.component';
import { AuthGuard } from './auth-guard.guard';

export const routes: Routes = [
  {
    path:'register', component: RegisterComponent, canActivate: [AuthGuard]
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create-vacation', component: CreateVacationComponent, canActivate: [AuthGuard]
  }
];
