import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-alerts',
  imports: [MatTableModule, MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './send-alerts.page.html',
  styleUrl: './send-alerts.page.css'
})
export class SendAlertsPage implements OnInit{
  attendancesUsers: any = [];
  successMessage: string | null = null;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'status', 'date_attendance','actions'];
  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.getDataUserAttendances();
  }
  getDataUserAttendances(){
    this.apiService.GetAttendanceUserReport().subscribe({
      next:(data)=>{
        console.log(data)
        this.attendancesUsers = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  SendAlert(id:number, status:string){
    this.apiService.SendAlertUser(id, status).subscribe({
      next:(data)=>{
        this.matSnackBar.open('Se envio la alerta', 'Cerrar', { duration: 4000 });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
