import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DashboardComponent } from '../../dashboard';
interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}
@Component({
  selector: 'app-notifications',
  imports: [
    MatListModule, MatIconModule, 
    DatePipe, CommonModule, 
    MatCard, MatCardHeader, 
    MatCardTitle, MatCardSubtitle, 
    MatCardContent, MatCardActions],
  templateUrl: './notifications.pages.html',
  styleUrl: './notifications.pages.css'
})
export class NotificationsPages implements OnInit {
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }
  @ViewChild(DashboardComponent) dashboard!:DashboardComponent;
  notifications: Notification[] = [];
  ngOnInit(): void {
    this.loadNotifications();
  }
  loadNotifications(): void {
    this.apiService.GetNotifications().subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
      },
      error: (err) => {
        console.error('Error al obtener notificaciones:', err);
        /* this.snackBar.open('Error al cargar notificaciones', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        }); */
      }
    });
  }
  markAsRead(notif: Notification): void {
    this.apiService.markNotificationAsRead(notif.id).subscribe({
      next: (updatedNotif: Notification) => {
        notif.is_read = updatedNotif.is_read;
        notif.read_at = updatedNotif.read_at;
        this.snackBar.open('Notificación marcada como leída', 'Cerrar', {
          duration: 2000,
          panelClass: ['snackbar-success']
        });
        this.loadNotifications();
        this.dashboard.GetAlertaNoRead();
      },
      error: (err) => {
        console.error('Error al marcar como leída:', err);
        this.snackBar.open('No se pudo actualizar la notificación', 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
