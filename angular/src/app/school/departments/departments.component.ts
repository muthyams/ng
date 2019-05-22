import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Departments } from "./departments";
import { Observable } from 'rxjs'


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  acadamicYear = ['2017-2018', '2018-2019'];
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
  constructor(private fb: FormBuilder) {

  } 
  ngOnInit(): void{
    this.adddept = this.fb.group(
    {
      deptName: ['', Validators.required],
      acadamicYear: ['', Validators.required],
      isHostel: ['', Validators.required],
      section: ['', Validators.required],
      maxStudent: ['', Validators.required],
      board: ['', Validators.required]
     

      

    })
}
get f() {
  return this.adddept.controls;
}
onSubmit() {
  alert("sbmit button is called");
  this.submitted = true;

  this.depts = this.adddept.value;
  console.log(this.depts.deptName);
  console.log(this.depts.acadamicYear);
  console.log(this.adddept.value);
  this.deptName = this.depts.deptName;
  if (this.adddept.valid) {
    
  }
}

}
