import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { MyAttendancesComponent } from './pages/dashboard/views/my-attendances/my-attendances';
import { MarkAttendancesComponent } from './pages/dashboard/views/mark-attendances/mark-attendances';
import { ViewAllAttendancePage } from './pages/dashboard/views/view-all-attendance/view-all-attendance.page';
import { ManageWorkersPage } from './pages/dashboard/views/manage-workers/manage-workers.page';
import { SendAlertsPage } from './pages/dashboard/views/send-alerts/send-alerts.page';
import { GenerateReportsPage } from './pages/dashboard/views/generate-reports/generate-reports.page';
import { NotificationsPages } from './pages/dashboard/views/notifications/notifications.pages';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children:[
    { path: 'asistencias', component: MyAttendancesComponent },
    { path: 'marcar-asistencia', component: MarkAttendancesComponent },
    { path: 'ver-todas-las-asistencias', component: ViewAllAttendancePage },
    { path: 'gestionar-trabajadores', component: ManageWorkersPage },
    { path: 'enviar-alertas', component: SendAlertsPage },
    { path: 'generar-reportes', component: GenerateReportsPage },
    { path: 'notificaciones', component: NotificationsPages },
  ] }
];
