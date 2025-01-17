import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Employee } from '../../models/Employee';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-details.component.html',
})
export class EmployeeDetailsComponent {
  data: Array<Employee> = [];
  isNull = true;
  constructor(private ac: ActivatedRoute) {
    ac.data.subscribe((data) => (this.data = data['employee']));
  }

  ngAfterViewInit() {
    this.projectSer
      .getAssignedProjects$(this.data[0].id)
      .subscribe((data) =>
        data.length > 0 ? (this.isNull = false) : (this.isNull = true)
      );

    console.log(this.isNull);
  }

  projectSer = inject(ProjectsService);
}
