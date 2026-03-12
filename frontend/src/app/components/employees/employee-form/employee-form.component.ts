import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../../services/employee.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;
  submitted = false;
  departments: string[] = [
  'HR',
  'Engineering',
  'Finance',
  'Sales',
  'Marketing'
];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,  private snackBar: MatSnackBar,) {

    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });

  }

  onSubmit() {

  this.submitted = true;

  if (this.employeeForm.invalid) {
    return;
  }

  this.employeeService.addEmployee(this.employeeForm.value)
  .subscribe({
    next: (res) => {
      console.log('Employee created', res);

       this.snackBar.open('Employee created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });


      this.employeeForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      console.error(err);
             this.snackBar.open(
        err?.error?.detail || 'Error marking attendance',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      );
    }
  });

}
  
}
