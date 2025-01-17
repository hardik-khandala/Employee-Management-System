import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Employee } from '../models/Employee';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employeeDataSource = new BehaviorSubject<Array<Employee>>([
    {
      id: '193b94fb59f',
      name: 'Hardik',
      email: 'hardik@gmail.com',
      phone: 1234567890,
      status: 'Active',
      post: 'Developer',
      doj: '2024-12-19',
      projects: [],
    },
    {
      id: '193b9504dcf',
      name: 'Kunj',
      email: 'Kunj@email.com',
      phone: 1234567891,
      status: 'Inactive',
      post: 'Manager',
      doj: '2024-12-05',
      projects: [],
    },
  ]);

  get employeeData$() {
    return this._employeeDataSource.asObservable();
  }

  validateData(prop: string) {
    return (control: AbstractControl) => {
      let inValid = false;

      this.employeeData$
        .pipe(
          map((data) =>
            prop === 'email'
              ? data.find((emp) => emp.email === control.value)
              : prop === 'phone'
                ? data.find((emp) => emp.phone === control.value)
                : undefined
          )
        )
        .subscribe((data) => {
          if (data !== undefined) inValid = true;
        });

      return inValid && prop === 'email'
        ? { uniqeEmail: true }
        : inValid && prop === 'phone'
          ? { uniqePhone: true }
          : null;
    };
  }

  updateEmployee(data: Employee) {
    let emp = this.handleDelete(data.id);

    emp.push(data);

    this._employeeDataSource.next(emp);
  }

  private handleDelete(id: string) {
    let emp = this._employeeDataSource.value;

    let ind = emp.findIndex((data) => data.id === id);

    emp.splice(ind, 1);

    return emp;
  }

  deleteEmployee(id: string) {
    this._employeeDataSource.next(this.handleDelete(id));
  }

  addEmployee(data: Employee) {
    let emp = this._employeeDataSource.value;
    emp.push(data);
    this._employeeDataSource.next(emp);
  }

  assignProject(pid: string, eid: string) {
    let emp = this._employeeDataSource.value;

    emp.forEach((data) => {
      if (data.id === eid) {
        data.projects.push(pid);
      }
    });

    this._employeeDataSource.next(emp);
  }

  removeAssignedProject(pid: string, eid: string) {
    let emp = this._employeeDataSource.value;

    emp.forEach(
      (data) =>
        data.id === eid &&
        data.projects.splice(
          data.projects.findIndex((pr) => pr === pid),
          1
        )
    );
  }
}
