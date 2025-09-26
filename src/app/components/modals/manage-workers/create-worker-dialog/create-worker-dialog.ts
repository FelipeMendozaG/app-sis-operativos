import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../../services/api';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-create-worker-dialog',
  imports: [
    MatDialogContent, 
    MatFormField, 
    MatLabel, 
    MatDialogActions, 
    MatSelectModule, 
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './create-worker-dialog.html',
  styleUrls: ['./create-worker-dialog.css']
})
export class CreateWorkerDialog {
  workerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateWorkerDialog>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: [{ value: 'trabajador', disabled: true }]
    });
  }

  onSubmit() {
    if (this.workerForm.valid) {
      const params:any = this.workerForm.value;
      this.apiService.createWorker(params.nombres, params.apellidos, params.email, params.password).subscribe({
        next: (response) => {
          console.log("response",response);
          this.dialogRef.close(this.workerForm.value);
        },
        error:(err)=>{
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
