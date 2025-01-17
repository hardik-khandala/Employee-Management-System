import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Employee } from '../models/Employee';
import { inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

export const employeeDetailsResolver = (
  route: ActivatedRouteSnapshot
): Observable<Array<Employee>> => {
  let empId = route.params['id'];

  let empSer = inject(EmployeeService);
  return empSer.employeeData$.pipe(
    map((data) => data.filter((emp) => emp.id === empId)),
    catchError((err) => {
      return of(err);
    })
  );
};
