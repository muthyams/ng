import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddStudent } from './addStudent';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class StudentService{

    constructor(private http:HttpClient) {}
    private studentUrl = 'http://localhost:8762/api/dept/students';
    //private userUrl = '/api';
  
    public getstudent():Observable<AddStudent> {
      return this.http.get<AddStudent>(this.studentUrl);
    }
  
    public deleteUser(students) {
      alert('del service');
      return this.http.delete(this.studentUrl + "/"+ students.id);
    }
  
    public createStudent(students) {
       // alert('create service'+this.deptUrl +"/saveDept");
      return this.http.post<AddStudent>(this.studentUrl +"/saveStudent", students);
    }


    public getAllStudents():Observable<AddStudent[]> {
      return this.http.get<AddStudent[]>(this.studentUrl);
    }
}