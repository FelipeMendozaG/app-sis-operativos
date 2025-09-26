import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../services/api';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-view-all-attendance',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './view-all-attendance.page.html',
  styleUrl: './view-all-attendance.page.css'
})
export class ViewAllAttendancePage implements OnInit {
  attendancesUsers: any = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'status', 'date_attendance'];
  startDate!: Date;
  endDate!: Date;
  constructor(
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    this.getDataUserAttendances('', '');
  }
  getDataUserAttendances(date_start: string, date_end: string) {
    this.apiService.GetAttendanceAll(date_start, date_end).subscribe({
      next: (data) => {
        console.log(data)
        this.attendancesUsers = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  applyDateFilter() {
    if (this.startDate && this.endDate) {
      this.getDataUserAttendances(this.startDate.toString(), this.endDate.toString());
    }
  }
  exportFileExcel() {
    if (this.startDate && this.endDate) {
      this.apiService.GetAttendanceExport(this.startDate.toString(), this.endDate.toString()).subscribe({
        next: (res) => {
          console.log("========> res",res);
          const blob = new Blob([res.body!], { type: res.headers.get('Content-Type') || 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const contentDisposition = res.headers.get("Content-Disposition");

          console.log("contentDisposition",contentDisposition);
          let filename = "reporte.xlsx";
          if (contentDisposition && contentDisposition.indexOf("filename=") !== -1) {
            filename = contentDisposition.split("filename=")[1].replace(/"/g, "");
          }
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
