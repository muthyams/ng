import { OnInit, Component, AfterViewInit } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddStudent } from './addStudent';
import { StudentService } from './student.service';
declare var $:any;


@Component({
    selector: 'app-student',
    templateUrl: './addStudent.component.html',
    styleUrls: ['./addStudent.component.css']
  })
export class AddStudentComponent implements OnInit, AfterViewInit
{
    studentHeader = "Add Student Admission Form";
    gender = ['Male','Female'];
    caste= ['OBC','SC','ST','EBC','OC'];
    natinolity = ['Indian'];
    occupation = ['farmer','Business Man','Job'];
    submitted = false;
  studentForm: FormGroup;
  private formSubmitAttempt: boolean;
  students: AddStudent = new AddStudent();
    constructor( private fb: FormBuilder, private _script: ScriptLoaderService, private addStudentService: StudentService) { }
    
    ngOnInit(): void {
      this.studentForm = this.fb.group(
        {
          studentFirstName: ['', Validators.required],
          studentLastName: ['', Validators.required],
          dateOfBirth:['',Validators.required],
          age:['', Validators.required],
          gender:['', Validators.required],
          caste:['',Validators.required],
          natinolity:['',Validators.required],

          fatherName:['',Validators.required],
          motherName:['',Validators.required],
          occupation:['', Validators.required],
          mobileNumber:['', Validators.required],
          mobileNumber1:['', Validators.required],
          emailAddress:['',Validators.required],

          houseNumber:['',Validators.required],
          village:['',Validators.required],
          mandal:['', Validators.required],
          district:['', Validators.required],
          state:['', Validators.required],
          pinCode:['', Validators.required],
          asPermenent:['',Validators.required],      
    
          houseNumber1:['',Validators.required],
          village1:['',Validators.required],
          mandal1:['', Validators.required],
          district1:['', Validators.required],
          state1:['', Validators.required],
          pinCode1:['', Validators.required],

          section: ['', Validators.required],
          className:['',Validators.required],
          isHostel: ['',Validators.required]
         
        })
    }

    get f() {
      return this.studentForm.controls;
    }
    onSubmit() {
      alert("sbmit button is called");
      this.submitted = true;
    
      this.students = this.studentForm.value;
      console.log(this.studentForm.value);
      this.createStudent(this.students);
      if (this.studentForm.valid) {
            
      }
    }

    ngAfterViewInit() {
        this._script.load('./assets/js/scripts/form-plugins.js');
        $('#ex-phone2').mask('+91-9999999999', {
          formControlName: 'mobileNumber'
        });
   
        $('#dob').mask('99/99/9999', {
          placeholder: 'dd/mm/yyyy',
          formControlName: 'dateOfBirth'
      });
      }
      createStudent(studentForm: AddStudent): void {
        this.addStudentService.createStudent(studentForm)
          .subscribe(data => {
            console.log("User created successfully.--");
            //this.isSaved = true;
            //this.deptName = department.deptName;
          });
    
      };
    
}

