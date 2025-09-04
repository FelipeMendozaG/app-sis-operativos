import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../services/api';
interface Attendance {
  id: number;
  user_id: number;
  date: string;
  status: string;
}
@Component({
  selector: 'app-my-attendances',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './my-attendances.html',
  styleUrls: ['./my-attendances.css']
})
export class MyAttendancesComponent implements OnInit {
  attendances: Attendance[] = [];
  displayedColumns: string[] = ['date', 'status'];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getAttendances().subscribe({
      next: (data) => (this.attendances = data),
      error: (err) => console.error('Error fetching attendances', err)
    });
  }
}
