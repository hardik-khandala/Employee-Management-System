import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  myForm!: FormGroup;
  isAdd: boolean = true;
  isManager: boolean = false;
  isUpdate: boolean = false;
  updateId: string = '';
  employeeService = inject(EmployeeService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ac: ActivatedRoute
  ) {
    this.myForm = fb.group({
      name: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.employeeService.validateData('email'),
        ],
      ],
      phone: [
        '',
        [Validators.required, this.employeeService.validateData('phone')],
      ],
      status: [''],
      post: [''],
      doj: [''],
    });

    ac.data.subscribe((data) => {
      if (Object.values(data).length !== 0) {
        this.isAdd = false;
        console.log(data['employee']);
        this.myForm.disable();
        this.myForm.patchValue(data['employee'][0]);
        if (data['employee'][0].post === 'Manager') {
          this.isManager = true;
        }
        this.updateId = data['employee'][0].id;
      }
    });
  }

  handleSubmit() {
    if (this.myForm.valid) {
      this.employeeService.addEmployee({
        id: Date.now().toString(16),
        ...this.myForm.getRawValue(),
      });
      alert('Employee Added SuccessFully!');
      this.router.navigateByUrl('employees');
    } else alert('Please Enter Valid Details!');

    this.employeeService.employeeData$.subscribe((data) => console.log(data));
  }

  handleViewUpdate() {
    this.isUpdate = true;
    this.myForm.enable();
    if (this.isManager) {
      this.myForm.get('post')?.disable();
    }
  }

  handleUpdate() {
    console.log(this.updateId);
    this.employeeService.updateEmployee({
      id: this.updateId,
      ...this.myForm.getRawValue(),
    });
    alert('Employee Updated SuccessFully!');
    this.router.navigateByUrl('employees');
    this.myForm.enable();
    this.isUpdate = false;
    this.isAdd = true;
  }
}
