import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  ],
  providers: [],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {

  employeeForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {

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

    const employeeData = this.employeeForm.value;

    // No API call yet — just print data
    console.log('Employee Created:', employeeData);

    alert('Employee data captured in console');

    this.employeeForm.reset();
    this.submitted = false;
  }
  
}
