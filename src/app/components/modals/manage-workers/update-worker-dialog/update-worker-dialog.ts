import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api';

@Component({
  selector: 'app-update-worker-dialog',
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
  templateUrl: './update-worker-dialog.html',
  styleUrl: './update-worker-dialog.css'
})
export class UpdateWorkerDialog {
  workerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateWorkerDialog>,
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
    if (this.data) {
      this.workerForm.patchValue({
        nombres: this.data.first_name,
        apellidos: this.data.last_name,
        email: this.data.email,
        password: this.data.password
      });
    }
  }
  onSubmit() {
    if (this.workerForm.valid) {
      const params:any = this.workerForm.value;
      this.apiService.UpdateUser(this.data.ID, params.nombres, params.apellidos, params.email, params.password).subscribe({
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
