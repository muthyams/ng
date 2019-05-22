import { Component, OnInit } from '@angular/core';
import { Course } from './Course';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';


@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
  })
  export class CourseComponent implements OnInit {
    sections= ["A","B","C","D"];
    dept = ["6th class","7th class","8th class","9th class","10th class"];
    depts = 'Add Departments';
  //phaseForm: FormGroup;
  selectedValue: string;
  addSubj: FormGroup;
  course: Course = new Course();

  constructor(private _fb: FormBuilder) {
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
     this.phaseArray.controls.splice(index,1) 
    }

  
}