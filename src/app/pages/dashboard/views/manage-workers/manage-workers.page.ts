import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../services/api';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkerDialog } from '../../../../components/modals/manage-workers/create-worker-dialog/create-worker-dialog';
import { UpdateWorkerDialog } from '../../../../components/modals/manage-workers/update-worker-dialog/update-worker-dialog';
@Component({
  selector: 'app-manage-workers',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './manage-workers.page.html',
  styleUrls: ['./manage-workers.page.css']
})
export class ManageWorkersPage implements OnInit {
  workers: any = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  constructor(
    private apiService: ApiService, private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.workers = data;
      },
      error: (error) => {
        console.error('Error fetching workers:', error);
      }
    });
  }
  openCreateWorkerDialog() {
    const dialogRef = this.dialog.open(CreateWorkerDialog, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.getUsers().subscribe({
          next: (data) => {
            this.workers = data;
          },
          error: (error) => {
            console.error('Error fetching workers:', error);
          }
        });
      }
    });
  }
  deleteUsers(id: number) {
    this.apiService.DeleteUser(id).subscribe({
      next: (data) => {
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  updateUser(id: number) {
    if (id) {
      this.apiService.GetUserUpdate(id).subscribe({
        next: (data) => {
          const dialogRef = this.dialog.open(UpdateWorkerDialog, {
            width: 'auto',
            data: data
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.apiService.getUsers().subscribe({
                next: (dataAll) => {
                  this.workers = dataAll;
                },
                error: (error) => {
                  console.error('Error fetching workers:', error);
                }
              });
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  getUsers() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.workers = data;
      },
      error: (error) => {
        console.error('Error fetching workers:', error);
      }
    });
  }
}
