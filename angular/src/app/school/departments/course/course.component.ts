import { Component, OnInit } from '@angular/core';
import { Course } from './Course';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Departments } from '../departments';
import { CourseComponentService } from './course.component.service';
import { LText } from '@angular/core/src/render3/interfaces';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  sections: Departments[];
  dept = [];
  depts = 'Add Departments';
  departments: Departments[] = [];
  //phaseForm: FormGroup;
  selectedValue: string;
  courseForm: FormGroup;
  course: Course = new Course();
  addCount: number = 0;

  constructor(private _fb: FormBuilder, private courseService: CourseComponentService) {
  }

  ngOnInit() {
    this.courseForm = this._fb.group(
      {
        departmentName: ['', Validators.required],
        section: ['', Validators.required],
        isDefaultSubj: ['', Validators.required],

        phaseExecutions: this.
          _fb.group({
            PRE: this._fb.array([this.addPhase()])
          })
      });
    this.selectedValue = "";
    this.courseService.getAllDepartments().subscribe(
      departments => {
        this.departments = departments;
        console.log(this.departments);

      });
  }

  addPhase() {
    return this._fb.group({
      courseName1: [''],
      comments1: ['']
    });
  }
  addMorePhase()
   {
    this.addCount++;
    alert("add more phase" + this.addCount);
    this.phaseArray.push(this.addPhase());
  }
  onSubmit() 
  {
    this.course = this.courseForm.value;
    console.log("count==" + this.addCount)
    for (let i = 0; i <= this.addCount; i++) {
      this.course.courseName += "," + this.courseForm.value.phaseExecutions.PRE[i].courseName1;
      this.course.comments += "," + this.courseForm.value.phaseExecutions.PRE[i].comments1;
    }
    this.createCourse(this.course);
  }
  get phaseArray() {
    const control = <FormArray>(<FormGroup>this.courseForm.get('phaseExecutions')).get('PRE');
    return control;
  }
  removeInput(index) {
    this.addCount--;
    this.phaseArray.controls.splice(index, 1);
  }
  onChangeDeptName(filterVal: any) {
    this.sections = this.departments.filter((item) => item.deptName == filterVal);
    console.log(this.departments);
  }
  createCourse(course: Course): void {
    this.courseService.createCourse(course)
      .subscribe(data => {
        console.log("User created successfully.--");
      });
  };
}
