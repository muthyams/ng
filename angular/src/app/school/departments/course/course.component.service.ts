import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departments } from '../departments';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class CourseComponentService{
    
    constructor(private http:HttpClient) {}
    private deptUrl = 'http://localhost:8762/api/dept/departments';
    //private userUrl = '/api';
  
    public getUsers():Observable<Departments> {
      return this.http.get<Departments>(this.deptUrl);
    }
  
    public deleteUser(departments) {
      alert('del service');
      return this.http.delete(this.deptUrl + "/"+ departments.id);
    }
  
    public createDepat(departments) {
       // alert('create service'+this.deptUrl +"/saveDept");
      return this.http.post<Departments>(this.deptUrl +"/saveDept", departments);
    }

     //this is get the all the departments 
    public getAllDepartments():Observable<Departments[]> {
      return this.http.get<Departments[]>(this.deptUrl);
    }
    
}