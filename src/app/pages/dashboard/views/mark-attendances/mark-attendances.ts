import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../services/api';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-mark-attendances',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './mark-attendances.html',
  styleUrls: ['./mark-attendances.css']
})
export class MarkAttendancesComponent {
  successMessage: string | null = null;
  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ) { }

  markAttendance() {
    this.apiService.markAttendance().subscribe({
      next: (response) => {
        const now = new Date();
        this.successMessage = `Attendance marked at ${now.toLocaleTimeString()}`;
        this.matSnackBar.open('Se marco la asistencia', 'Cerrar', { duration: 4000 });
      },
      error: (responseError) => {
        const {message_error} = responseError.error
        this.matSnackBar.open(message_error, 'Cerrar', { duration: 4000 });
        this.successMessage = null;
      }
    });
  }
}
