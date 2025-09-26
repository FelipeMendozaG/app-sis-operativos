import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api';

interface TypeReport {
  type_status: String,
  count: number
}
interface UserReport {
  status: String,
  full_name: String,
  count: number
}

@Component({
  selector: 'app-generate-reports',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './generate-reports.page.html',
  styleUrls: ['./generate-reports.page.css']
})
export class GenerateReportsPage implements OnInit {
  // 📊 Bar Chart
  barChartType: ChartType = 'bar';
  startDate!: Date;
  endDate!: Date;
  barChartData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    datasets: [
      { data: [5, 7, 3, 8, 6], label: 'Asistencias' },
      { data: [1, 0, 2, 1, 3], label: 'Faltas' }
    ]
  };

  // 🥧 Pie Chart
  pieChartType: ChartType = 'pie';
  pieChartData: any = {
    labels: ['Leídas', 'No Leídas'],
    datasets: [
      { data: [15, 6] }
    ]
  };

  // 📈 Line Chart (estadístico)
  lineChartType: ChartType = 'bar';
  lineChartData: any = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      { data: [12, 19, 14, 20], label: 'Tardanzas', fill: true, tension: 0.4, borderColor: '#42a5f5', backgroundColor: 'rgba(66,165,245,0.2)' }
    ]
  };

  lineChartType2: ChartType = 'bar';
  lineChartData2: any = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      { data: [12, 19, 14, 20], label: 'Tardanzas', fill: true, tension: 0.4, borderColor: '#42a5f5', backgroundColor: 'rgba(66,165,245,0.2)' }
    ]
  };

  // Opciones globales
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };
  constructor(
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    this.apiService.GetReportGrafic(formattedDate.toString(), formattedDate.toString()).subscribe({
      next: (data: any) => {
        console.log(data);

        const { attendance_reports, attendance_reports_users, attendance_reports_type, attendance_reports_date } = data;
        this.formatAttendanceReport(attendance_reports);
        this.formatReport(attendance_reports_users);
        this.formatTypeStatus(attendance_reports_type);
        this.formatReportDate(attendance_reports_date)
      },
      error: (err) => {
        console.log(err);
      }
    })
    return;
  }
  formatReport(attendance_reports_users: any) {
    const labels = [...new Set(attendance_reports_users.map((item: any) => item.full_name))];
    const statuses = [...new Set(attendance_reports_users.map((item: any) => item.status))];
    const datasets = statuses.map(status => {
      return {
        label: status,
        data: labels.map(name => {
          const found = attendance_reports_users.find(
            (item: any) => item.full_name === name && item.status === status
          );
          return found ? Number(found.count) : 0;
        })
      };
    });
    this.lineChartData = {
      labels: labels,
      datasets: datasets
    }
  }
  formatAttendanceReport(attendance_reports: any) {
    this.pieChartData = {
      label: attendance_reports.map((item: TypeReport) => { return item.type_status.toUpperCase }),
      datasets: [
        { data: attendance_reports.map((item: TypeReport) => { return item.count }) }
      ]
    }
  }
  formatTypeStatus(attendance_reports_type: any) {
    // Convertimos a labels y values
    const labels = attendance_reports_type.map((item: any) => item.status);
    const values = attendance_reports_type.map((item: any) => Number(item.count));
    this.lineChartData2 = {
      labels: labels, // ['puntual', 'tardanza']
      datasets: [
        {
          data: values, // [8, 3]
          label: 'Asistencias',
          fill: true,
          tension: 0.4,
          borderColor: '#42a5f5',
          backgroundColor: 'rgba(66,165,245,0.2)'
        }
      ]
    };
  }
  formatReportDate(attendance_reports_date: any) {
    let Labels = attendance_reports_date.map((item:any)=>this.formatDate(item.date_format) )
    let dataCount = attendance_reports_date.map((item:any)=>item.count )
    let MyDataSets:any = [
      {data:dataCount,label:'Asistencias'}
    ]
    this.barChartData = {
      labels:Labels,
      datasets: MyDataSets
    };
  }
  applyDateFilter() {
    if (this.startDate && this.endDate) {
      this.apiService.GetReportGrafic(this.startDate.toString(), this.endDate.toString()).subscribe({
        next: (data: any) => {
          const { attendance_reports, attendance_reports_users, attendance_reports_type, attendance_reports_date } = data;
          this.formatAttendanceReport(attendance_reports);
          this.formatReport(attendance_reports_users);
          this.formatTypeStatus(attendance_reports_type);
          this.formatReportDate(attendance_reports_date)
        },
        error: (err) => {
          console.log(err);
        }
      })
      return;
    }
  }
  deleteDuplicated = (arr: any) => {
    return [...new Set(arr)];
  }
  formatDate = (dateFormat:string):string =>{
    return new Date(dateFormat).toISOString().split("T")[0]
  }
}
