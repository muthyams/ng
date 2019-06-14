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
  sectionCount:any;
  
  //sectionsCount = 4;
  selectedSection:string[] = [];
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
      data => {
        this.departments = data;
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

    this.sectionCount = +this.sections.find(x=>x.sections).sections;
    console.log(this.sectionCount);
    let sectionAlp = ["A","B","C","D","E","F"];
    sectionAlp = sectionAlp.slice(0, this.sectionCount);
     this.selectedSection = sectionAlp
    console.log(sectionAlp);

    console.log("addMorePhase");
    for (let i = 1; i < sectionAlp.length; i++) {
    this.addCount++;
    console.log("add more phase" +i);
    this.phaseArray.push(this.addPhase());
    }
  }
  onSubmit() 
  {
    this.course = this.courseForm.value;
    console.log("count==" + this.addCount)
    for (let i = 0; i <= this.addCount; i++) {
      this.course.courseName += "," + this.courseForm.value.phaseExecutions.PRE[i].courseName1;
      this.course.comments += "," + this.courseForm.value.phaseExecutions.PRE[i].comments1;
         console.log(this.course.comments)
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
    //console.log(this.sections);
    
  }
  createCourse(course: Course): void {
    this.courseService.createCourse(course)
      .subscribe(data => {
        console.log("User created successfully.--");
      });
  };
}
