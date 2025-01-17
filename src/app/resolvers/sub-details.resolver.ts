import { RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
import { inject } from '@angular/core';

export const subDetailsResolver = (
  _: any,
  state: RouterStateSnapshot
): Observable<Array<Employee>> => {
  let empId = state.url.split('/')[2];

  let empSer = inject(EmployeeService);
  return empSer.employeeData$.pipe(
    map((data) => data.filter((emp) => emp.id === empId)),
    catchError((err) => {
      return of(err);
    })
  );
};
