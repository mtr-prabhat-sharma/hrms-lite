import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { AttendanceListComponent } from './components/attendance/attendance-list/attendance-list.component';
import { AttendanceFormComponent } from './components/attendance/attendance-form/attendance-form.component';

export const routes: Routes = [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },

  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add', component: EmployeeFormComponent },

  { path: 'attendance', component: AttendanceListComponent },
  { path: 'attendance/add', component: AttendanceFormComponent }

];
