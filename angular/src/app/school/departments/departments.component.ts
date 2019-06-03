import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departments } from "./departments";
import { Observable } from 'rxjs'
import { AddDepartmentService } from './add-department.service';
import { CourseComponent } from './course/course.component';
import { CourseComponentService } from './course/course.component.service';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  deptDuration = ['2017-2018', '2018-2019'];
  sections = ['1', '2', '3', '4'];
  maxCount = ['30', '40', '60', '80'];
  board = ['STATE', 'CBSE', 'ICS'];
  className = ['6th class', '7th class', '8th class'];

  dept = 'Add Departments';
  submitted = false;
  adddept: FormGroup;
  private formSubmitAttempt: boolean;
  depts: Departments = new Departments();
  deptName: string;
  isSaved: boolean;
  departments: Departments[] = [];

  constructor(private fb: FormBuilder, private departmentService: AddDepartmentService) {

  }
  ngOnInit(): void {
    this.adddept = this.fb.group(
      {
        deptName: ['', Validators.required],
        isHostel: ['', Validators.required],
        sections: ['', Validators.required],
        maxStudents: ['', Validators.required],
        board: ['', Validators.required],
        deptDuration: ['', Validators.required]
      })
  }
  get f() {
    return this.adddept.controls;
  }
  onSubmit() {
    alert("sbmit button is called");
    this.submitted = true;

    this.depts = this.adddept.value;
    console.log(this.adddept.value);
    this.deptName = this.depts.deptName;
    this.createDepat(this.depts);
    if (this.adddept.valid) {

    }
  }

  createDepat(department: Departments): void {
    this.departmentService.createDepat(department)
      .subscribe(data => {
        console.log("User created successfully.--");
        this.isSaved = true;
        this.deptName = department.deptName;
      });

  };

}
