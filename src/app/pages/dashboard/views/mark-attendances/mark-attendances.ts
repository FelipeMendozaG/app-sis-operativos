import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../services/api';

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
  constructor(private apiService: ApiService
    
  ) { }

  markAttendance() {
    this.apiService.markAttendance().subscribe({
      next: () => {
        const now = new Date();
        this.successMessage = `Attendance marked at ${now.toLocaleTimeString()}`;
      },
      error: (error) => {
        console.error('Error marking attendance:', error);
      }
    });
  }
}
