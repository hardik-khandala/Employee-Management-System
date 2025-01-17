import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestWith,
  map,
  Observable,
} from 'rxjs';
import { Employee } from '../../models/Employee';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  status$ = new BehaviorSubject<string | null>(null);
  post$ = new BehaviorSubject<string | null>(null);
  employeeService = inject(EmployeeService);

  router = inject(Router);

  empData$ = new Observable<Array<Employee>>();
  searchQuery$ = new BehaviorSubject<string | null>(null);

  ngOnInit() {
    //search filter
    this.empData$ = this.employeeService.employeeData$.pipe(
      combineLatestWith(this.searchQuery$),
      map(([data, searchQuery]) =>
        data.filter((emp) =>
          searchQuery
            ? emp.name.toLowerCase().includes(searchQuery!.toLowerCase()) ||
              emp.email.toLowerCase().includes(searchQuery!.toLowerCase())
            : true
        )
      ),
      combineLatestWith(this.status$),
      map(([data, status]) =>
        data.filter((emp) => (status ? emp.status.includes(status) : true))
      ),
      combineLatestWith(this.post$),
      map(([data, post]) =>
        data.filter((emp) => (post ? emp.post.includes(post) : true))
      ),
      map((data) => data.sort((a, b) => (a.doj < b.doj ? 1 : -1)))
    );

    // only search filter
    // this.empData$ = combineLatest([
    //   this.searchQuery$,
    //   this.employeeService.employeeData$,
    // ]).pipe(
    //   map(([searchQuery, data]) =>
    //     data.filter(
    //       (emp) =>
    //         emp.name.toLowerCase().includes(searchQuery!.toLowerCase()) ||
    //         emp.email.toLowerCase().includes(searchQuery!.toLowerCase())
    //     )
    //   )
    // );
  }

  handleDelete(e: Event, emp: Employee) {
    e.stopPropagation();
    if (emp.status !== 'Inactive') {
      let res = confirm('Are You sure for delete?');
      if (res) this.employeeService.deleteEmployee(emp.id);
    } else alert("InActive Users Can't be deleted");
  }

  navigate(e: Event, url: string) {
    e.stopPropagation();
    this.router.navigateByUrl('employees/' + url);
  }

  handleFilter(e: Event, filter: string) {
    console.log((<HTMLSelectElement>e.target).value, filter);
    if (filter === 'search')
      this.searchQuery$.next((<HTMLInputElement>e.target).value);
    if (filter === 'status')
      this.status$.next((<HTMLSelectElement>e.target).value);
    if (filter === 'post') this.post$.next((<HTMLSelectElement>e.target).value);
  }
}
