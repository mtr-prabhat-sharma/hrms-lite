import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoRecordsComponent } from '../../../shared/no-records/no-records.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule, MatIconModule,
  MatFormFieldModule, MatInputModule, MatPaginatorModule, RouterModule, MatTooltipModule, NoRecordsComponent ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();

displayedColumns: string[] = [
  'employee_id',
  'full_name',
  'email',
  'department',
  'action'
];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
  const search = filter.toLowerCase();

  return (
    (data.employee_id || '').toLowerCase().includes(search) ||
    (data.full_name || '').toLowerCase().includes(search) ||
    (data.email || '').toLowerCase().includes(search) ||
    (data.department || '').toLowerCase().includes(search)
  );
};
  }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

 loadEmployees() {
  this.employeeService.getEmployees().subscribe({
    next: (data) => {
      this.dataSource.data = data;
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  deleteEmployee(id: number) {

  if (!confirm('Are you sure you want to delete this employee?')) {
    return;
  }

  this.employeeService.deleteEmployee(id)
  .subscribe({
    next: () => {
      this.loadEmployees();
    },
    error: (err) => {
      console.error(err);
    }
  });

}
}
