import { Component, OnInit } from '@angular/core';
import { Course } from './Course';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Departments } from '../departments';
import { CourseComponentService } from './course.component.service';


@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
  })
  export class CourseComponent implements OnInit {
    sections: Departments[];
    dept = [];
    depts = 'Add Departments';
    departments: Departments[]=[];
  //phaseForm: FormGroup;
  selectedValue: string;
  addSubj: FormGroup;
  course: Course = new Course();

  constructor(private _fb: FormBuilder, private courseService: CourseComponentService ) {
   
   
  }

  ngOnInit() {
    this.addSubj = this._fb.group(
        {
            deptName: ['', Validators.required],
            section: ['', Validators.required],
            isDefaultSubj: ['', Validators.required],
            
      phaseExecutions: this._fb.group({
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
      subjectName: [''],
      comments: ['']
    });
  }



  addMorePhase() {
      alert("add more phase");
    this.phaseArray.push(this.addPhase());
  }
 
  onSubmit() {
    alert("onsubmit");
    this.course = this.addSubj.value;
    console.log(this.course);
    
  }
  get phaseArray() {
    const control = <FormArray>(<FormGroup>this.addSubj.get('phaseExecutions')).get('PRE');
    return control;
  }
  removeInput(index) {
    console.log(index);
     this.phaseArray.controls.splice(index,1) ;
    }

    onChangeDeptName(filterVal: any) {
        alert("onchange");
        this.sections = this.departments.filter((item) => item.deptName == filterVal);
        console.log(this.departments);
        
      }
}
