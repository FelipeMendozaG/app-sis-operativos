import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { MyAttendancesComponent } from './pages/dashboard/views/my-attendances/my-attendances';
import { MarkAttendancesComponent } from './pages/dashboard/views/mark-attendances/mark-attendances';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children:[
    { path: 'asistencias', component: MyAttendancesComponent },
    { path: 'marcar-asistencia', component: MarkAttendancesComponent }
  ] }
];
